import { Controller, HttpException, Get, Post, Body, Delete, Param, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

//Interfaces
import { Product } from './interfaces/product.interface';

//Dto
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FirebaseGuard } from 'src/firebase';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }


    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: (_, file: any, cb: any) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                return cb(null, `${randomName}${extname(file.originalname)}.jpg`)
            }
        })
    }))
    @UseGuards(FirebaseGuard)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async uploadImage(@Param('id') id: string, @UploadedFile() file: any): Promise<void> {
        try {
            return await this.productsService.uploadImage(id, file.path.replace('files/', ''));
        } catch (error) {
            this.error(error);
        }
    }


    @Post('create')
    @UseGuards(FirebaseGuard)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async createProduct(@Body() body: CreateProductDto): Promise<Product> {
        try {
            return await this.productsService.createProduct(body);
        } catch (error) {
            this.error(error);
        }
    }

    @Post('update/:id')
    @UseGuards(FirebaseGuard)
    async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<Product> {
        try {
            return await this.productsService.updateProduct(id, body);
        } catch (error) {
            this.error(error);
        }
    }

    @Delete('delete/:id')
    @UseGuards(FirebaseGuard)
    async deleteProduct(@Param('id') id: string): Promise<void> {
        try {
            return await this.productsService.deleteProduct(id);
        } catch (error) {
            this.error(error);
        }
    }

    @Get('/')
    @UseGuards(FirebaseGuard)
    async listProducts(): Promise<Product[]> {
        try {
            return await this.productsService.listProducts();
        } catch (error) {
            this.error(error);
        }
    }

    @Get('details/:id')
    @UseGuards(FirebaseGuard)
    async getUserById(@Param('id') id: string): Promise<Product> {
        try {
            return await this.productsService.getUserById(id);
        } catch (error) {
            this.error(error);
        }
    }

    @Get('image/:id')
    async serveImage(@Param('id') id: string, @Res() res: Response): Promise<any> {
        res.sendFile(id, { root: 'files' });
    }

    // Show error
    error(message: string, code?: number): HttpException {
        throw new HttpException(message, code || 403);
    }
}

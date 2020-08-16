import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Interfaces
import { Product } from './interfaces/product.interface';

//Dto
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Products') private readonly productsModel: Model<Product>
    ) { }

    // Upload image
    uploadImage(id: string, path: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.productsModel.updateOne({ _id: id }, { image: path });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    // Create product
    createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const product = new this.productsModel(createProductDto);
                product.save();
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Update product
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await this.productsModel.updateOne({ _id: id },
                    updateProductDto
                );
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Delete product
    deleteProduct(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.productsModel.deleteOne({ _id: id });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    //List products
    listProducts(): Promise<Product[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await this.productsModel.find();
                resolve(products);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get user by id
    getUserById(id: string): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await this.productsModel.findOne({ _id: id });
                resolve(product);
            } catch (error) {
                reject(error);
            }
        });
    }
}

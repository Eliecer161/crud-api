import { Controller, HttpException, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';

// Interfaces
import { Hotel } from './interfaces/hotel.interface';

//Dto
import { CreateHotelDto } from './dto/create-hotel.dto';
import { FirebaseGuard } from 'src/firebase';

@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) {}


    @Post('create')
    @UseGuards(FirebaseGuard)
    async createHotel(@Body() body: CreateHotelDto): Promise<Hotel> {
        try {
            return await this.hotelsService.createHotel(body);
        } catch (error) {
            this.error(error);
        }
    }

    @Get(':id')
    @UseGuards(FirebaseGuard)
    async getHotelById(@Param('id') id: string): Promise<Hotel> {
        try {
            return await this.hotelsService.getHotelById(id);
        } catch (error) {
            this.error(error);
        }
    }

    @Get('/')
    @UseGuards(FirebaseGuard)
    async listHotels(): Promise<Hotel[]> {
        try {
            return await this.hotelsService.listHotels();
        } catch (error) {
            this.error(error);
        }
    }

    // Show error
    error(message: string, code?: number): HttpException {
        throw new HttpException(message, code || 403);
    }
}

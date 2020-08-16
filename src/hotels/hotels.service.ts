import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { Hotel } from './interfaces/hotel.interface';

// Dto
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelsService {
    constructor(
        @InjectModel('Hotels') private readonly hotelsModel: Model<Hotel>
    ) { }

    // Create hotel
    createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        return new Promise(async (resolve, reject) => {
            try {
                const hotel = new this.hotelsModel(createHotelDto);
                hotel.save();
                resolve(hotel);
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get hotel by id
    getHotelById(id: string): Promise<Hotel> {
        return new Promise(async (resolve, reject) => {
            try {
                const hotel = await this.hotelsModel.findOne({ _id: id });
                resolve(hotel);
            } catch (error) {
                reject(error);
            }
        });
    }

    // List hotels
    listHotels(): Promise<Hotel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const hotels = await this.hotelsModel.find();
                resolve(hotels);
            } catch (error) {
                reject(error);
            }
        });
    }

}

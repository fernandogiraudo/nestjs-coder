import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Product[];
  constructor(){
    this.products = [];
  }
  create(createProductDto: CreateProductDto) {
    if(!createProductDto.title || !createProductDto.description || !createProductDto.price){
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);
    }
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      ...createProductDto
    }
    this.products.push(newUser);
    return {message: 'product created', payload: newUser};
  }

  findAll() {
    return {message: 'Products', payload: this.products};
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

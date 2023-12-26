import {
  Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return this.productsService.createOne(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (product) {
      return product;
    }
    throw new NotFoundException('Product does not exist!');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (product) {
      const updateProduct = this.productsService.update(id, updateProductDto);
      return updateProduct;
    }
    throw new NotFoundException('Product does not exist!');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (product) {
      const deleteProduct = this.productsService.delete(id);
      return deleteProduct;
    }
    throw new NotFoundException('Product does not exist!');
  }
}

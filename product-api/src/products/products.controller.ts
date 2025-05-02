import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct, UpdateProduct } from './interfaces/product.interface';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productsService.getProductById(productId);
  }

  @Post()
  createProduct(@Body() body: CreateProduct) {
    return this.productsService.createProduct(body);
  }

  @Patch(':id')
  updateProduct(@Param('id') id:string , @Body() body: UpdateProduct){
    return this.productsService.updateProduct(id,body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id:string){
   return this.productsService.deleteProduct(id);
  }
}

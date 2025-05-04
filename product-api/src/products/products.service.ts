import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { readFile, writeFile } from 'node:fs/promises';
import {
  CreateProduct,
  Product,
  UpdateProduct,
} from './interfaces/product.interface';
import { join } from 'node:path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private PRODUCTS_PATH = join(
    process.cwd(),
    'src',
    'products',
    'data',
    'products.json',
  );

  async getAllProducts() {
    const productsJSON = await readFile(this.PRODUCTS_PATH, 'utf-8');
    const products = JSON.parse(productsJSON) as Product[];
    return products;
  }

  async getProductById(id: string) {
    const products = await this.getAllProducts();
    const foundProduct = products.find((product) => product.id === id);

    if (!foundProduct) throw new NotFoundException('product not found');
    return foundProduct;
  }
  // POST, PATCH и DELETE
  async saveProducts(products: Product[]) {
    await writeFile(this.PRODUCTS_PATH, JSON.stringify(products, null, 2));
  }
  async createProduct(body: CreateProduct) {
    const products = await this.getAllProducts();
    const foundProduct = products.find(
      (product) => product.title === body.title,
    );
    if (foundProduct) throw new ConflictException('product already exists');

    const createdProduct = {
      id: uuid(),
      ...body,
    };
    products.push(createdProduct);
    await this.saveProducts(products);
    return createdProduct;
  }

  async updateProduct(id: Product['id'], body: UpdateProduct) {
    const products = await this.getAllProducts();
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) throw new NotFoundException('product not found');
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return { ...product, ...body };
      }
      return product;
    });
    await this.saveProducts(updatedProducts);
  }

  async deleteProduct(id: Product['id']) {
    const products = await this.getAllProducts();
    const foundProduct = products.find((product) => product.id === id);
    if (!foundProduct) throw new NotFoundException('product not found');
    const filteredProducts = products.filter((product) => product.id !== id);
    await this.saveProducts(filteredProducts);
  }
}

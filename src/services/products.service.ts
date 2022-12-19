import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './../schemas/productSchema';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/data.transfer.objects/products.dtos';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 101,
      name: 'Marcadores',
      description: 'Marcadores de 12 unidades Fabercastell',
      price: 2300,
      stock: 4,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const busqueda = this.products.find((item) => item.id === id);
    if (!busqueda) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return busqueda;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newproduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newproduct);
    return newproduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const busqueda = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...busqueda,
      ...payload,
    };
    return this.products[index], 'El producto ha sido actualizado.';
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    this.products.splice(index, 1);
    return {
      message: 'Producto eliminado ',
    };
  }
}

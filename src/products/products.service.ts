import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ComponentDto } from 'src/components/dto/component.dto';
import { Component } from 'src/components/entities/component.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Product[]> {
    const { offset, limit } = paginationQuery;
    return this.productsRepository.find({
      relations: ['category', 'components'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'components'],
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category_id, ...restCreateProductDto } = createProductDto;

    const components =
      restCreateProductDto.components &&
      (await Promise.all(
        restCreateProductDto.components.map((component) =>
          this.preloadComponentById(component),
        ),
      ));
    const category =
      category_id && (await this.preloadCategoryById(category_id));
    const product = this.productsRepository.create({
      ...restCreateProductDto,
      components,
      category,
    });

    const { id: productId } = await this.productsRepository.save(product);
    return this.findOne(productId);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { category_id, ...restUpdateProductDto } = updateProductDto;

    const components =
      restUpdateProductDto.components &&
      (await Promise.all(
        restUpdateProductDto.components.map((component) =>
          this.preloadComponentById(component),
        ),
      ));

    const category =
      category_id && (await this.preloadCategoryById(category_id));

    const product = await this.productsRepository.preload({
      id,
      ...restUpdateProductDto,
      components,
      category,
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const { id: productId } = await this.productsRepository.save(product);
    return this.findOne(productId);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  private async preloadComponentById(component: ComponentDto) {
    const { id, qty } = component;

    if (id) {
      const existingComponent = await this.componentsRepository.findOne({
        where: { id },
      });

      if (existingComponent) {
        return this.componentsRepository.preload({
          id,
          qty,
        });
      }

      return this.componentsRepository.create(component);
    }

    return this.componentsRepository.create(component);
  }

  private async preloadCategoryById(id: string) {
    const category = this.categoriesRepository.findOne({
      where: { id },
    });

    if (category) {
      return category;
    }

    return undefined;
  }
}

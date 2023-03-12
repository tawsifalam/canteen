import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: Repository<Discount>,
  ) {}

  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Discount[]> {
    const { offset, limit } = paginationQuery;
    return this.discountsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.discountsRepository.findOne({
      where: { id },
    });

    if (!discount) {
      throw new NotFoundException(`Discount #${id} not found`);
    }
    return discount;
  }

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const { id: discountId } = await this.discountsRepository.save(
      createDiscountDto,
    );
    return this.findOne(discountId);
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.discountsRepository.preload({
      id,
      ...updateDiscountDto,
    });

    if (!discount) {
      throw new NotFoundException(`Discount #${id} not found`);
    }
    const { id: discountId } = await this.discountsRepository.save(discount);
    return this.findOne(discountId);
  }

  async remove(id: string): Promise<void> {
    const discount = await this.findOne(id);
    await this.discountsRepository.remove(discount);
  }
}

import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { Tax } from './entities/tax.entity';

@Injectable()
export class TaxesService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxesRepository: Repository<Tax>,
  ) {}

  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Tax[]> {
    const { offset, limit } = paginationQuery;
    return this.taxesRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Tax> {
    const tax = await this.taxesRepository.findOne({
      where: { id },
    });

    if (!tax) {
      throw new NotFoundException(`Tax #${id} not found`);
    }
    return tax;
  }

  async create(createTaxDto: CreateTaxDto): Promise<Tax> {
    const { id: taxId } = await this.taxesRepository.save(createTaxDto);
    return this.findOne(taxId);
  }

  async update(id: string, updateTaxDto: UpdateTaxDto): Promise<Tax> {
    const tax = await this.taxesRepository.preload({
      id,
      ...updateTaxDto,
    });

    if (!tax) {
      throw new NotFoundException(`Tax #${id} not found`);
    }
    const { id: taxId } = await this.taxesRepository.save(tax);
    return this.findOne(taxId);
  }

  async remove(id: string): Promise<void> {
    const tax = await this.findOne(id);
    await this.taxesRepository.remove(tax);
  }
}

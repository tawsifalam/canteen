import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

import { OrderLine } from './entities/order-line.entity';
import { Receipt } from './entities/receipt.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptsRepository: Repository<Receipt>,
    @InjectRepository(OrderLine)
    private readonly orderLinesRepository: Repository<OrderLine>,
  ) {}

  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Receipt[]> {
    const { offset, limit } = paginationQuery;
    return this.receiptsRepository.find({
      relations: ['order_lines'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOne({
      where: { id },
      relations: ['order_lines'],
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt #${id} not found`);
    }
    return receipt;
  }

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    const { order_lines, ...restCreateReceiptDto } = createReceiptDto;
    const orderLines = await Promise.all(
      order_lines.map((orderLine) =>
        this.preloadOrderLineByProductName(orderLine),
      ),
    );

    const receipt = this.receiptsRepository.create({
      ...restCreateReceiptDto,
      order_lines: orderLines,
    });

    const { id: receiptId } = await this.receiptsRepository.save(receipt);
    return this.findOne(receiptId);
  }

  async update(
    id: string,
    updateReceiptDto: UpdateReceiptDto,
  ): Promise<Receipt> {
    const { order_lines, ...restUpdateProductDto } = updateReceiptDto;

    const orderLines =
      order_lines &&
      (await Promise.all(
        order_lines.map((orderLine) =>
          this.preloadOrderLineByProductName(orderLine),
        ),
      ));

    const receipt = await this.receiptsRepository.preload({
      id,
      ...restUpdateProductDto,
      order_lines: orderLines,
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt #${id} not found`);
    }
    const { id: receiptId } = await this.receiptsRepository.save(receipt);
    return this.findOne(receiptId);
  }

  async remove(id: string): Promise<void> {
    const receipt = await this.findOne(id);
    await this.receiptsRepository.remove(receipt);
  }

  private async preloadOrderLineByProductName(orderLine: CreateOrderLineDto) {
    const existingOrderLine = await this.orderLinesRepository.findOne({
      where: { product_name: orderLine.product_name },
    });

    if (existingOrderLine) {
      return existingOrderLine;
    }

    return this.orderLinesRepository.create({
      ...orderLine,
    });
  }
}

import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodsRepository: Repository<PaymentMethod>,
  ) {}

  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaymentMethod[]> {
    const { offset, limit } = paginationQuery;
    return this.paymentMethodsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string): Promise<PaymentMethod> {
    const paymetMethod = await this.paymentMethodsRepository.findOne({
      where: { id },
    });

    if (!paymetMethod) {
      throw new NotFoundException(`Payment Method #${id} not found`);
    }
    return paymetMethod;
  }

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { id: paymentMethodId } = await this.paymentMethodsRepository.save(
      createPaymentMethodDto,
    );
    return this.findOne(paymentMethodId);
  }

  async update(
    id: string,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodsRepository.preload({
      id,
      ...updatePaymentMethodDto,
    });

    if (!paymentMethod) {
      throw new NotFoundException(`Payment Method #${id} not found`);
    }
    const { id: paymentMethodId } = await this.paymentMethodsRepository.save(
      paymentMethod,
    );
    return this.findOne(paymentMethodId);
  }

  async remove(id: string): Promise<void> {
    const paymentMethod = await this.findOne(id);
    await this.paymentMethodsRepository.remove(paymentMethod);
  }
}

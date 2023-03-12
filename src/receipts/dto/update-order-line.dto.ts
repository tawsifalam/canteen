import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderLineDto } from './create-order-line.dto';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {}

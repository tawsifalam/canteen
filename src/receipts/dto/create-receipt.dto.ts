import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DiningOptionsEnum, ReceiptTypeEnum } from '../entities/receipt.entity';
import { CreateOrderLineDto } from './create-order-line.dto';

export class CreateReceiptDto {
  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsEnum(ReceiptTypeEnum)
  receipt_type: ReceiptTypeEnum;

  @IsOptional()
  @IsString()
  refund_for: string;

  @IsString()
  payment_method: string;

  @IsOptional()
  @IsNumber()
  cash_received: number;

  @IsOptional()
  @IsNumber()
  cash_returned: number;

  @IsNumber()
  total_money: number;

  @IsOptional()
  @IsNumber()
  total_taxes: number;

  @IsOptional()
  @IsNumber()
  total_discounts: number;

  @IsOptional()
  @IsEnum(DiningOptionsEnum)
  dining_option: DiningOptionsEnum;

  @Type(() => Date)
  @IsDate()
  receipt_date: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  cancelled_date: string;

  @IsArray()
  @ValidateNested({ each: true })
  order_lines: CreateOrderLineDto[];
}

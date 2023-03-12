import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { DiscountTypeEnum } from '../entities/discount.entity';

export class CreateDiscountDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  discount_amount: number;

  @IsOptional()
  @IsNumber()
  discount_percent: number;

  @IsEnum(DiscountTypeEnum)
  discount_type: DiscountTypeEnum;
}

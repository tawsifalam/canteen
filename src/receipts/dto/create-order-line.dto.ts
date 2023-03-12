import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderLineDto {
  @IsString()
  product_name: string;

  @IsOptional()
  @IsString()
  product_description: string;

  @IsNumber()
  product_price: number;

  @IsNumber()
  qty: number;

  @IsNumber()
  total_price: number;

  @IsOptional()
  @IsNumber()
  discount_in_amount: number;

  @IsOptional()
  @IsNumber()
  discount_in_percent: number;

  @IsOptional()
  @IsNumber()
  tax_in_amount: number;

  @IsOptional()
  @IsNumber()
  tax_in_percent: number;
}

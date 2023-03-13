import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { PaymentTypeEnum } from '../entities/payment-method.entity';

export class CreatePaymentMethodDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  description: Record<string, any>;

  @IsOptional()
  @IsEnum(PaymentTypeEnum)
  payment_type: PaymentTypeEnum;
}

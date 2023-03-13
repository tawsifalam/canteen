import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaxTypeEnum } from '../entities/tax.entity';

export class CreateTaxDto {
  @IsString()
  name: string;

  @IsNumber()
  rate: number;

  @IsOptional()
  @IsEnum(TaxTypeEnum)
  tax_type: TaxTypeEnum;
}

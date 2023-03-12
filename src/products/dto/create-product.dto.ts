import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ComponentDto } from 'src/components/dto/component.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  track_stack: boolean;

  @IsOptional()
  @IsBoolean()
  sold_by_weight: boolean;

  @IsOptional()
  @IsBoolean()
  is_composite: boolean;

  @IsNumber()
  sku: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  qty_in_stock: number;

  @IsNumber()
  price: number;

  @IsNumber()
  cost: number;

  @IsOptional()
  @IsString()
  category_id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  components: ComponentDto[];
}

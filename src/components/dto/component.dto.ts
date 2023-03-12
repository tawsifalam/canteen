import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ComponentDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNumber()
  qty: number;
}

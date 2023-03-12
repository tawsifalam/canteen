import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';

import { Receipt } from './entities/receipt.entity';
import { ReceiptsService } from './receipts.service';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}
  @Get()
  findAll(@Query() pagintaionQuery: PaginationQueryDto): Promise<Receipt[]> {
    return this.receiptsService.findAll(pagintaionQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiptsService.findOne(id);
  }

  @Post()
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptsService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptsService.remove(id);
  }
}

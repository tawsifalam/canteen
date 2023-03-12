import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLine } from './entities/order-line.entity';
import { Receipt } from './entities/receipt.entity';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, OrderLine])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [TypeOrmModule],
})
export class ReceiptsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DiscountsModule } from './discounts/discounts.module';
import { CategoriesModule } from './categories/categories.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { TaxesModule } from './taxes/taxes.module';
import { PaymentMethodsModule } from './payment_methods/payment-methods.module';
import { ComponentsModule } from './components/components.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ProductsModule,
    DiscountsModule,
    CategoriesModule,
    ReceiptsModule,
    TaxesModule,
    PaymentMethodsModule,
    ComponentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

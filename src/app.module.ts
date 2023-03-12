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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    DiscountsModule,
    CategoriesModule,
    ReceiptsModule,
    TaxesModule,
    PaymentMethodsModule,
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

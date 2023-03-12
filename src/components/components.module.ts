import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  exports: [TypeOrmModule],
})
export class ComponentsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from 'src/common/dto/auth-header-api-key.strategy';

@Module({
  imports: [PassportModule, ConfigModule.forRoot()],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRecord } from 'src/entities/records-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRecord], 'serviceConnection')
  ],
  providers: [RecordsResolver, RecordsService],
  exports: [RecordsService]
})
export class RecordsModule {}

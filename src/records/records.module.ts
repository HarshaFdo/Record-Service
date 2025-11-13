import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsResolver } from './records.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRecord } from 'src/entities/records-service.entity';
import { VehicleFieldsResolver } from './vehicle-fields.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRecord])
  ],
  providers: [RecordsResolver, VehicleFieldsResolver, RecordsService],
  exports: [RecordsService]
})
export class RecordsModule {}

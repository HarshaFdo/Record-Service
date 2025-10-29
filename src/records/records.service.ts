import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRecord } from 'src/entities/records-service.entity';
import { Repository } from 'typeorm';
import { PaginatedServiceRecords } from './dto/paginated-result.dto';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(ServiceRecord, 'serviceConnection')
    private readonly recordRepository: Repository<ServiceRecord>,
  ) {}

  async create(input: CreateRecordInput): Promise<ServiceRecord> {
    const record = this.recordRepository.create(input);
    return this.recordRepository.save(record);
  }

  async findAll(
    page: number = 1,
    limit: number = 100,
  ): Promise<PaginatedServiceRecords> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.recordRepository.findAndCount({
      order: { service_date: 'DESC' },
      skip,
      take: limit, // 100 records per page
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<ServiceRecord> {
    const record = await this.recordRepository.findOne({
      where: { id },
    });
    if (!record) throw new NotFoundException(`Service record #${id} not found`);
    return record;
  }

  async findByVin(vin: string): Promise<ServiceRecord[]> {
    return this.recordRepository.find({
      where: { vin },
      order: { service_date: 'DESC' },
    });
  }

  async update(id: string, input: UpdateRecordInput) {
    const record = await this.findOne(id);
    Object.assign(record, input);
    return this.recordRepository.save(record);
  }

  async remove(id: string): Promise<ServiceRecord> {
    const record = await this.findOne(id);
    await this.recordRepository.delete(id);
    return record;
  }
}

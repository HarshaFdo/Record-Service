import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRecord } from 'src/entities/records-service.entity';
import { Repository } from 'typeorm';
import { PaginatedServiceRecords } from './dto/paginated-result.dto';

@Injectable()
export class RecordsService {
  private readonly logger = new Logger(RecordsService.name);

  constructor(
    @InjectRepository(ServiceRecord)
    private readonly recordRepository: Repository<ServiceRecord>,
  ) {}

  async create(input: CreateRecordInput): Promise<ServiceRecord> {
    this.logger.log('Creating service record with input:', input);

    const record = this.recordRepository.create(input);
    const savedRecord = await this.recordRepository.save(record);

    delete savedRecord.vehicle;
    this.logger.log('Service record saved successfully:', savedRecord);
    return savedRecord;
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
    this.logger.log(`Fetching service records for VIN: ${vin}`);

    const records = await this.recordRepository.find({
      where: { vin },
      order: { service_date: 'DESC' },
    });

    this.logger.log(`Found ${records.length} service record(s) for VIN: ${vin}`);
    return records;

  }

  async update(id: string, input: UpdateRecordInput) {
    this.logger.log(`Updating service record #${id} with input:`, input);
    const record = await this.findOne(id);

    delete record.vehicle;
    this.logger.log(`Current service record data:`, record);

    Object.assign(record, input);
    this.logger.log(`Saving updated service record to the database:`, record);

    return this.recordRepository.save(record);
  }

  async remove(id: string): Promise<ServiceRecord> {
    this.logger.log(`Deleting service record #${id}`);
    const record = await this.findOne(id);

    delete record.vehicle;
    this.logger.log(`Current service record data:`, record);

    await this.recordRepository.delete(id);
    this.logger.log(`Service record #${id} deleted successfully.`);
    return record;
  }
}

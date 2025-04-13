import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      const isConnected = this.dataSource.isInitialized;
      console.log(
        '📡 Database connection status:',
        isConnected ? 'CONNECTED' : 'NOT CONNECTED',
      );
    } catch (error) {
      console.error('❌ Error connecting to the database:', error);
    }
  }

  async getCompanies(): Promise<Company[]> {
    const result = await this.dataSource.query(
      'SELECT * FROM companies LIMIT 10',
    );
    return result;
  }
}

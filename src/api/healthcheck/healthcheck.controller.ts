import { Controller, Get } from '@nestjs/common';

export interface HealthcheckResponse {
  status: 'ok';
  timestamp: string;
}

@Controller('api/health')
export class HealthcheckController {
  @Get()
  check(): HealthcheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsUrl,
  Max,
  Min,
  validateSync,
} from 'class-validator';
export class EnvironmentVariables {
  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  PORT?: number;
  @IsUrl({
    protocols: ['postgres', 'postgresql'],
    require_tld: false,
    require_protocol: true,
  })
  DATABASE_URL!: string;
}
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

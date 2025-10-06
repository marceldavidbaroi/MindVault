import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsIn,
} from 'class-validator';

export class FilterSummaryDto {
  @IsOptional()
  @IsInt()
  @Min(1970)
  @Max(3000)
  year?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month?: number;

  @IsOptional()
  @IsDateString(
    { strict: true },
    { message: 'date must be a valid ISO date string (YYYY-MM-DD)' },
  )
  date?: string;

  @IsOptional()
  @IsIn(['daily', 'monthly', 'yearly', 'detailed'], {
    message: 'detailLevel must be one of daily, monthly, yearly, detailed',
  })
  detailLevel?: 'daily' | 'monthly' | 'yearly' | 'detailed';
}

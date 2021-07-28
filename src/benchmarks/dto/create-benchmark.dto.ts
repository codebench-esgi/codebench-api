import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBenchmarkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subject: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional()
  giturl?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  difficulty: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  maxCyclomaticComplexity: number;
}
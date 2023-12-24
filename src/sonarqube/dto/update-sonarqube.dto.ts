import { PartialType } from '@nestjs/mapped-types';
import { CreateSonarqubeDto } from './create-sonarqube.dto';

export class UpdateSonarqubeDto extends PartialType(CreateSonarqubeDto) {}

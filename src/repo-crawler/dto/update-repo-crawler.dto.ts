import { PartialType } from '@nestjs/mapped-types';
import { CreateRepoCrawlerDto } from './create-repo-crawler.dto';

export class UpdateRepoCrawlerDto extends PartialType(CreateRepoCrawlerDto) {}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepoCrawlerService } from './repo-crawler.service';
import { CreateRepoCrawlerDto } from './dto/create-repo-crawler.dto';
import { UpdateRepoCrawlerDto } from './dto/update-repo-crawler.dto';

@Controller('repo-crawler')
export class RepoCrawlerController {
  constructor(private readonly repoCrawlerService: RepoCrawlerService) {}

  @Post()
  create(@Body() createRepoCrawlerDto: CreateRepoCrawlerDto) {
    return this.repoCrawlerService.create(createRepoCrawlerDto);
  }

  @Get()
  findAll() {
    return this.repoCrawlerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repoCrawlerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepoCrawlerDto: UpdateRepoCrawlerDto) {
    return this.repoCrawlerService.update(+id, updateRepoCrawlerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repoCrawlerService.remove(+id);
  }
}

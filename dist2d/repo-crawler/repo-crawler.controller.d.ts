import { RepoCrawlerService } from './repo-crawler.service';
import { CreateRepoCrawlerDto } from './dto/create-repo-crawler.dto';
import { UpdateRepoCrawlerDto } from './dto/update-repo-crawler.dto';
export declare class RepoCrawlerController {
    private readonly repoCrawlerService;
    constructor(repoCrawlerService: RepoCrawlerService);
    create(createRepoCrawlerDto: CreateRepoCrawlerDto): string;
    findAll(): Promise<void>;
    findOne(id: string): string;
    update(id: string, updateRepoCrawlerDto: UpdateRepoCrawlerDto): string;
    remove(id: string): string;
}

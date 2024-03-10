import { CreateRepoCrawlerDto } from "./dto/create-repo-crawler.dto";
import { UpdateRepoCrawlerDto } from "./dto/update-repo-crawler.dto";
import { Octokit } from "octokit";
export declare class RepoCrawlerService {
    octokit: Octokit;
    constructor();
    create(createRepoCrawlerDto: CreateRepoCrawlerDto): string;
    findAll(): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateRepoCrawlerDto: UpdateRepoCrawlerDto): string;
    remove(id: number): string;
}

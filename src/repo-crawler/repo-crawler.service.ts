import { Injectable } from "@nestjs/common";
import { CreateRepoCrawlerDto } from "./dto/create-repo-crawler.dto";
import { UpdateRepoCrawlerDto } from "./dto/update-repo-crawler.dto";
import { Octokit } from "octokit";
import { execSync } from "child_process";

@Injectable()
export class RepoCrawlerService {
  octokit: Octokit;
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN,
    });
  }
  create(createRepoCrawlerDto: CreateRepoCrawlerDto) {
    return "This action adds a new repoCrawler";
  }

  async findAll() {
    let repositories = [];
    let page = 1;
    while (repositories.length < 10) {
      const response = await this.octokit.request("GET /search/repositories", {
        q: "language:javascript",
        sort: "stars",
        per_page: 10,
        page,
      });
      repositories = repositories.concat(
        response.data.items.map((item) => item.clone_url)
      );

      page++;
    }
    for (const repo of repositories.slice(0, 2)) {
      const segments = repo.split("/");
      // Remove '.git' from the last segment
      const repoName = segments[segments.length - 1].replace(".git", "");
      execSync(`git clone ${repo} ./repos/${repoName}`);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} repoCrawler`;
  }

  update(id: number, updateRepoCrawlerDto: UpdateRepoCrawlerDto) {
    return `This action updates a #${id} repoCrawler`;
  }

  remove(id: number) {
    return `This action removes a #${id} repoCrawler`;
  }
}

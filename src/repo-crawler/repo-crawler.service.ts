import { Injectable } from "@nestjs/common";
import { CreateRepoCrawlerDto } from "./dto/create-repo-crawler.dto";
import { UpdateRepoCrawlerDto } from "./dto/update-repo-crawler.dto";
import { Octokit } from "octokit";
import { execSync } from "child_process";
import * as fs from 'fs'

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
    // let repositories = [];
    // let page = 1;
    // while (repositories.length < 1000) {
    //   console.log({page})
    //   const response = await this.octokit.request("GET /search/repositories", {
    //     q: "stars:100..1000+language:javascript",
    //     per_page: 100,
    //     page,
    //   });
    //   repositories = repositories.concat(
    //     response.data.items.map((item) => item.clone_url)
    //   );
 
    //   page++;
    // }

    const crawledRepos = fs.readdirSync('src/splitter/projects')
    console.log(crawledRepos.length)

    // for (const repo of repositories) {
    //   const segments = repo.split("/");
    //   // Remove '.git' from the last segment
    //   const repoName = segments[segments.length - 1].replace(".git", "");
    //   console.log('Cloning', repoName)
    //   execSync(`git clone ${repo} ./src/splitter/projects/${repoName}`);
    // }
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

import { Injectable } from "@nestjs/common";
import { IssueTypes } from "./entities/sonarqube.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SonarqubeService {
  private sonarqubeFetch;
  constructor(private readonly configService: ConfigService) {
    this.sonarqubeFetch = (path: string, init?: RequestInit) =>
      fetch(new URL(path, this.configService.get("SONARQUBE_ENDPOINT")), {
        ...init,
        headers: {
          Authorization: `Bearer ${this.configService.get(
            "SONARQUBE_ACCESS_TOKEN"
          )}`,
          ...init?.headers,
        },
      })
        .then((res) => res.json())
        .catch((e) => console.error(e));
  }

  extractAfterLastSlash(inputString) {
    const lastSlashIndex = inputString.lastIndexOf("/");

    if (lastSlashIndex === -1) {
      // No slash found, return the original string
      return inputString;
    }

    return inputString.substring(lastSlashIndex + 1);
  }

  async findIssues(issueType: string) {
    const res = await this.sonarqubeFetch(
      `/api/issues/search?componentKeys=Test&s=FILE_LINE&resolved=false&rules=${IssueTypes[issueType]}&inNewCodePeriod=true&types=CODE_SMELL&ps=100&facets=cleanCodeAttributeCategories%2CimpactSoftwareQualities%2CcodeVariants&additionalFields=_all`
    );

    const issues = res.issues;
    const issueSources = issues.map((issue) =>
      this.extractAfterLastSlash(issue.component)
    );

    return Array.from(new Set(issueSources));
  }
}

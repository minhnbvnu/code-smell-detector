import { Injectable } from '@nestjs/common';
import { IssueTypes } from './entities/sonarqube.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SonarqubeService {
  private sonarqubeFetch;
  constructor(private readonly configService: ConfigService) {
    this.sonarqubeFetch = (path: string, init?: RequestInit) =>
      fetch(new URL(path, this.configService.get('SONARQUBE_ENDPOINT')), {
        ...init,
        headers: {
          Authorization: `Bearer ${this.configService.get(
            'SONARQUBE_ACCESS_TOKEN',
          )}`,
          ...init?.headers,
        },
      })
        .then((res) => res.json())
        .catch((e) => console.error(e));
  }

  async findIssues(issueType: string) {
    const res = await this.sonarqubeFetch(
      `api/issues/search?rules=${IssueTypes[issueType]}&ps=500&languages=js&additionalFields=ruleDescriptionContextKey&facets=rules`,
    );

    const issues = res.issues;
    const issueSources = issues.map((issue) => {
      const component = issue.component;
      const flows = issue.flows;
      const issueLines = new Set<number>();
      flows.forEach((flow) => {
        flow.locations.forEach((location) =>
          issueLines.add(location.textRange.startLine),
        );
      });

      return { component, issueLines: Array.from(issueLines) };
    });

    const codeWithIssues = [];

    for (const issueSource of issueSources) {
      const getSourcePromises = [];
      for (const issueLine of issueSource.issueLines) {
        const getIssueLineResponse = this.sonarqubeFetch(
          `/api/sources/index?from=${issueLine}&to=${issueLine + 1}&resource=${
            issueSource.component
          }`,
        ).then((res) => res[0]);
        getSourcePromises.push(getIssueLineResponse);
      }
      const issueCodes = await Promise.all(getSourcePromises);
      for (const issueCode of issueCodes) {
        codeWithIssues.push(Object.values(issueCode)[0]);
      }
    }

    return codeWithIssues;
  }
}

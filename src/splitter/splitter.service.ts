import { Injectable } from "@nestjs/common";
import * as babel from "@babel/core";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class SplitterService {
  BASE_URL = "src/splitter/codes/";
  readDir(projectPath: string) {
    const projectFiles = fs.readdirSync(projectPath);
    for (const file of projectFiles) {
      const filePath = path.join(projectPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this.readDir(filePath);
      } else if (filePath.endsWith(".js")) {
        console.log({ filePath });
        this.splitFunctionFromFile(filePath);
      }
    }
  }
  splitFunctionFromFile(filePath: string) {
    const code = fs.readFileSync(filePath, "utf-8");

    const result = babel.transformSync(code, {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        {
          visitor: {
            FunctionDeclaration(path) {
              const functionCode = code.substring(
                path.node.start,
                path.node.end
              );
              const functionName = path.node.id
                ? path.node.id.name
                : new Date().getTime();
              fs.writeFileSync(
                `scanner/functions/${functionName}.js`,
                functionCode,
                "utf-8"
              );
            },
          },
        },
      ],
    });
  }

  split() {
    const projects = fs.readdirSync(this.BASE_URL);

    for (const folder of projects) {
      const filePath = path.join(this.BASE_URL, folder);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this.readDir(filePath);
      }
    }

    return true;
  }
}

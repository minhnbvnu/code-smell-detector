import { Injectable } from "@nestjs/common";
import * as babel from "@babel/core";
import * as parser from "@babel/parser";
import generator from "@babel/generator";
import traverse from "@babel/traverse";
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
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        const functionCode = code.slice(path.node.start, path.node.end);
        if (path.node.id?.name) {
          const functionName = path.node.id.name
            ? path.node.id.name
            : new Date().getTime();
          console.log({ functionCode, functionName });

          fs.writeFileSync(
            `scanner/functions/${functionName}.js`,
            functionCode,
            "utf-8"
          );
        }
      },
      // Method(path) {
      //   if (path.node.key.type === "Identifier") {
      //     let functionCode = code.slice(path.node.start, path.node.end);
      //     const transformedCode = babel.transformSync(code, {
      //       plugins: [
      //         [
      //           require("@babel/plugin-proposal-class-properties"),
      //           { loose: true }, // Enable loose mode to handle class properties
      //         ],
      //       ],
      //     }).code;
      //     const functionName = path.node.key.name
      //       ? path.node.key.name
      //       : new Date().getTime();
      //     console.log({ transformedCode, functionName });
      //     fs.writeFileSync(
      //       `scanner/test/${functionName}.js`,
      //       transformedCode,
      //       "utf-8"
      //     );
      //   }
      // },
    });

    // const result = babel.transformSync(code, {
    //   presets: ["@babel/preset-env", "@babel/preset-react"],
    //   plugins: [
    //     {
    //       visitor: {
    //         Method(path) {
    //           if (path.node.key.type === "Identifier") {
    //             const functionCode =
    //             const functionName = path.node.key.name
    //               ? path.node.key.name
    //               : new Date().getTime();
    //             console.log({ functionCode, functionName });

    //             fs.writeFileSync(
    //               `scanner/test/${functionName}.js`,
    //               functionCode,
    //               "utf-8"
    //             );
    //           }
    //         },
    //         FunctionDeclaration(path) {
    //           // console.log(path.node.loc.start, path.node.loc.end);
    //           const functionCode = generator(path.node).code;
    //           const functionName = path.node.id
    //             ? path.node.id.name
    //             : new Date().getTime();
    //           fs.writeFileSync(
    //             `scanner/test/${functionName}.js`,
    //             functionCode,
    //             "utf-8"
    //           );
    //         },
    //       },
    //     },
    //   ],
    // });
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

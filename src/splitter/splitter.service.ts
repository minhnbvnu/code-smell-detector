import { Injectable } from "@nestjs/common";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class SplitterService {
  BASE_URL = "src/splitter/projects/";
  readDir(projectPath: string) {
    try{
    const projectFiles = fs.readdirSync(projectPath);
    for (const file of projectFiles) {
      const filePath = path.join(projectPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        if(file !== 'node_modules' && !file.startsWith('.')) {
          console.log('folder', file)
          this.readDir(filePath);
        }
      } else if (filePath.endsWith(".js")) {
        this.splitFunctionFromFile(filePath);
      }
    }} catch(e) {
      console.log('error orcurred: ', e)
      return
    }
  }
  splitFunctionFromFile(filePath: string) {
    const code = fs.readFileSync(filePath, "utf-8");
    try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        const functionCode = code.slice(path.node.start, path.node.end);
        if (path.node.id?.name) {
          const functionName = path.node.id.name
            ? path.node.id.name
            : new Date().getTime();
          console.log({  functionName });

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
  } catch (e) {
    console.log({e})
  }

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
    const data = fs.readFileSync('splitter-log.txt', 'utf8');
    const lines = data.split('\n');
    const processedFolders = [];

    lines.forEach(line => {
        const elements = line.split(' ');
        if (elements.length >= 2) {
          processedFolders.push(elements[1]);
        }
    });

    for (const [index, folder] of projects.entries()) {
      if(!processedFolders.includes(folder)) {
        fs.writeFileSync('splitter-log.txt',`${index} ${folder}\n`, {flag: 'a'})
      const filePath = path.join(this.BASE_URL, folder);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        this.readDir(filePath);
      }
      
    }
    }

    return true;
  }
}

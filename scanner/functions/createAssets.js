function createAssets(filename){
    const content = fs.readFileSync(filename, "utf-8");
    const ast = parser.parse(content, {
        sourceType: "module"
    })
    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value);
        }
    });

    const { code } = babel.transformFromAstSync(ast,null, {
        presets: ["@babel/preset-env"]
    });

    let id = moduleId++;
    return {
        id,
        filename,
        code,
        dependencies
    }
}
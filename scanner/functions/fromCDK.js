function fromCDK(cmd) {
  if (!cmd.skipSynth) {
    cp.execSync("cdk synth -o " + cmd.cdkOutput);
  }
  const manifestFile = fs.readFileSync(path.join(cmd.cdkOutput, "manifest.json"));
  const treeFile = fs.readFileSync(path.join(cmd.cdkOutput, "tree.json"));
  const manifest = JSON.parse(manifestFile);
  const tree = JSON.parse(treeFile);
  const includeStacks = cmd.stacks && (typeof cmd.stacks !== 'boolean') ? cmd.stacks.split(",").map(p=>p.trim()) : null;
  let stacks = Object.keys(manifest.artifacts).filter((p) => p !== "Tree" && (!includeStacks || includeStacks.includes(p)));
  const parentStack = Object.keys(tree.tree.children).filter((p) => p !== "Tree" && !p.includes(".assets") && (!includeStacks || includeStacks.includes(p)))[0];
  const template = fs.readFileSync(
    path.join(cmd.cdkOutput, `${parentStack}.template.json`)
  );
  const parsedTemplate = JSON.parse(template);
  templateCache.templates[parentStack] = parsedTemplate;
  templateCache.rootTemplate = parentStack;
  stacks = stacks.filter(p => p != parentStack);
  for (const stack of stacks.filter(p => !p.endsWith(".assets"))) {
    const childTemplate = fs.readFileSync(
      path.join(cmd.cdkOutput, `${stack}.template.json`)
    );
    const parsedChildTemplate = JSON.parse(childTemplate);
    parsedTemplate.Resources[stack] = {
      Type: "AWS::CloudFormation::Stack",
      Template: parsedChildTemplate,
      StackImport: true,
    };
    templateCache.templates[stack] = parsedChildTemplate;
  }
  return parsedTemplate;
}
function extractLayouts(path) {
  const layout = {};
  const { input, output } = JSON.parse(fs.readFileSync(path));

  const decoder = srcDecoder(input, output);
  const deref = astDereferencer(output);

  for (const src in output.contracts) {
    if (skipPath.some(prefix => src.startsWith(prefix))) {
      continue;
    }

    for (const contractDef of findAll('ContractDefinition', output.sources[src].ast)) {
      if (skipKind.includes(contractDef.contractKind)) {
        continue;
      }

      layout[contractDef.name] = extractStorageLayout(
        contractDef,
        decoder,
        deref,
        output.contracts[src][contractDef.name].storageLayout,
      );
    }
  }
  return layout;
}
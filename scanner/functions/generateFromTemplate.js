function generateFromTemplate(file, template, outputPrefix = '') {
  const script = path.relative(path.join(__dirname, '../..'), __filename);
  const input = path.join(path.dirname(script), template);
  const output = path.join(outputPrefix, file);
  const version = getVersion(output);
  const content = format(
    '// SPDX-License-Identifier: MIT',
    ...(version ? [version + ` (${file})`] : []),
    `// This file was procedurally generated from ${input}.`,
    '',
    require(template),
  );

  fs.writeFileSync(output, content);
  cp.execFileSync('prettier', ['--write', output]);
}
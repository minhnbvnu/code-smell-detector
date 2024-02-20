function printAnnotation(source, span, annot) {
  const {
    code,
    message,
    span: { start },
  } = annot;
  const slice = source.substring(span.start, span.end);
  const lineNumber = FluentSyntax.lineOffset(source, start) + 1;
  const columnOffset = FluentSyntax.columnOffset(source, start);
  const showLines = lineNumber - FluentSyntax.lineOffset(source, span.start);
  const lines = slice.split("\n");
  const head = lines.slice(0, showLines);
  const tail = lines.slice(showLines);

  console.log();
  console.log(`! ${code} on line ${lineNumber}:`);
  console.log(head.map(line => `  | ${line}`).join("\n"));
  console.log(`  … ${indent(columnOffset)}^----- ${message}`);
  console.log(tail.map(line => `  | ${line}`).join("\n"));
}
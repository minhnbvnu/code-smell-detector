function printResource(data) {
  const withSpans = !!program.withSpans;
  const source = data.toString();
  const res = FluentSyntax.parse(source, { withSpans });
  console.log(JSON.stringify(res, null, 2));

  if (!program.silent) {
    // Spans are required to pretty-print the annotations. If needed, re-parse
    // the source.
    const { body } = withSpans
      ? res
      : FluentSyntax.parse(source, { withSpans: true });
    body
      .filter(entry => entry.type === "Junk")
      .map(junk => printAnnotations(source, junk));
  }
}
function _drawLine(pat, chars = 60) {
  let cycle = 0;
  let pos = fraction(0);
  let lines = [""];
  let emptyLine = "";

  while (lines[0].length < chars) {
    const haps = pat.queryArc(cycle, cycle + 1);
    const durations = haps.filter(hap => hap.hasOnset()).map(hap => hap.duration);
    const charFraction = gcd(...durations);
    const totalSlots = charFraction.inverse();
    lines = lines.map(line => line + "|");
    emptyLine += "|";

    for (let i = 0; i < totalSlots; i++) {
      const [begin, end] = [pos, pos.add(charFraction)];
      const matches = haps.filter(hap => hap.whole.begin.lte(begin) && hap.whole.end.gte(end));
      const missingLines = matches.length - lines.length;

      if (missingLines > 0) {
        lines = lines.concat(Array(missingLines).fill(emptyLine));
      }

      lines = lines.map((line, i2) => {
        const hap = matches[i2];

        if (hap) {
          const isOnset = hap.whole.begin.eq(begin);
          const char = isOnset ? "" + hap.value : "-";
          return line + char;
        }

        return line + ".";
      });
      emptyLine += ".";
      pos = pos.add(charFraction);
    }

    cycle++;
  }

  return lines.join("\n");
}
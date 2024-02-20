async function generateZonesFile(tzdbDir) {
  async function processZone(zoneFile) {
    let contents = await fs.readFile(zoneFile, "utf-8");
    let lines = contents.split("\r\n");
    let vtimezone = lines.slice(lines.indexOf("BEGIN:VTIMEZONE") + 1, lines.indexOf("END:VTIMEZONE")).join("\r\n");
    return `  register(${JSON.stringify(vtimezone)});`;
  }

  let tzdbVersion = (await fs.readFile(path.join(tzdbDir, "version"), "utf-8")).trim();

  let lines = [
    `(function() {`,
    `  function register(tzdata) { ICAL.TimezoneService.register(ICAL.Component.fromString("BEGIN:VTIMEZONE\\r\\n" + tzdata + "\\r\\nEND:VTIMEZONE")) };`,
    `  ICAL.TimezoneService.IANA_TZDB_VERSION = "${tzdbVersion}";`
  ];

  let contents = await fs.readFile(path.join(tzdbDir, "zoneinfo", "zones.tab"), "utf-8");
  for (let line of contents.split("\n")) {
    let parts = line.split(" ");
    if (parts.length == 3 && parts[2].length) {
      lines.push(await processZone(path.join(tzdbDir, "zoneinfo", parts[2] + ".ics")));
    } else if (parts.length == 1 && parts[0].length) {
      lines.push(await processZone(path.join(tzdbDir, "zoneinfo", parts[0] + ".ics")));
    }
  }

  lines.push("})();");

  return lines.join("\n");
}
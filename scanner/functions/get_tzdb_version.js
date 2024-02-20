async function get_tzdb_version() {
  let response = await fetch('https://www.iana.org/time-zones');
  let text = await response.text();

  let match = text.match(/version">([0-9a-z]*)<\/span>/);
  if (!match) {
    throw new Error('Could not detect latest timezone database version');
  }
  return match[1];
}
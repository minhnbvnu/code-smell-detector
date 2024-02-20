function escapeCsv(val) {
  return val != null ? '"' + val.replace(/"/g, '""') + '"' : "N/A";
}
function formatCellShell(cell) {
  const format = chalk[cell?.delta > 0 ? 'red' : cell?.delta < 0 ? 'green' : 'reset'];
  return [
    format((!isFinite(cell?.value) ? '-' : cell.value.toString()).padStart(8)),
    format((!isFinite(cell?.delta) ? '-' : plusSign(cell.delta) + cell.delta.toString()).padStart(8)),
    format((!isFinite(cell?.prcnt) ? '-' : plusSign(cell.prcnt) + cell.prcnt.toFixed(2) + '%').padStart(8)),
  ];
}
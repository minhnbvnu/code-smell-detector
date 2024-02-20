function formatCellMarkdown(cell) {
  return [
    !isFinite(cell?.value) ? '-' : cell.value.toString(),
    !isFinite(cell?.delta) ? '-' : plusSign(cell.delta) + cell.delta.toString(),
    !isFinite(cell?.prcnt) ? '-' : plusSign(cell.prcnt) + cell.prcnt.toFixed(2) + '% ' + trend(cell.delta),
  ];
}
function parse_BrtFmlaError(data,length,opts){var cell=parse_XLSBCell(data);var value=data.read_shift(1);var o=[cell,value,"e"];if(opts.cellFormula){var formula=parse_XLSBCellParsedFormula(data,length-9);o[3]=""}else data.l+=length-9;return o}
function parse_Label(blob,length,opts){var cell=parse_XLSCell(blob,6);var str=parse_XLUnicodeString(blob,length-6,opts);cell.val=str;return cell}
function parse_BIFF2NUM(blob,length,opts){var cell=parse_XLSCell(blob,6);++blob.l;var num=parse_Xnum(blob,8);cell.val=num;return cell}
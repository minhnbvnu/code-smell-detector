function parse_BrtBeginComment(data,length){var out={};out.iauthor=data.read_shift(4);var rfx=parse_UncheckedRfX(data,16);out.rfx=rfx.s;out.ref=encode_cell(rfx.s);data.l+=16;return out}
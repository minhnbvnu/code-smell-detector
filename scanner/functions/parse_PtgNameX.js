function parse_PtgNameX(blob,length){var type=blob.read_shift(1)>>>5&3;var ixti=blob.read_shift(2);var nameindex=blob.read_shift(4);return[type,ixti,nameindex]}
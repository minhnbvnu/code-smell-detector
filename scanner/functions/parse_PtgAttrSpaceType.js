function parse_PtgAttrSpaceType(blob,length){var type=blob.read_shift(1),cch=blob.read_shift(1);return[type,cch]}
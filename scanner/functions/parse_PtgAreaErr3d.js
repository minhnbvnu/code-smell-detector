function parse_PtgAreaErr3d(blob,length){var type=(blob[blob.l++]&96)>>5;var ixti=blob.read_shift(2);blob.l+=8;return[type,ixti]}
function parse_PtgRef3d(blob,length){var ptg=blob[blob.l]&31;var type=(blob[blob.l]&96)>>5;blob.l+=1;var ixti=blob.read_shift(2);var loc=parse_RgceLoc(blob,4);return[type,ixti,loc]}
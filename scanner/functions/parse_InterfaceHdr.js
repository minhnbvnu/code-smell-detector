function parse_InterfaceHdr(blob,length){if(length===0)return 1200;var q;if((q=blob.read_shift(2))!==1200)throw"InterfaceHdr codePage "+q;return 1200}
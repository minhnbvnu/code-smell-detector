function parse_PtgAttrChoose(blob,length){blob.l+=2;var offset=blob.read_shift(2);var o=[];for(var i=0;i<=offset;++i)o.push(blob.read_shift(2));return o}
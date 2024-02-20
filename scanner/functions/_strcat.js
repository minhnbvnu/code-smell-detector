function _strcat(pdest, psrc) {
    pdest = pdest|0; psrc = psrc|0;
    var i = 0;
    var pdestEnd = 0;
    pdestEnd = (pdest + (_strlen(pdest)|0))|0;
    do {
      HEAP8[((pdestEnd+i)>>0)]=HEAP8[((psrc+i)>>0)];
      i = (i+1)|0;
    } while (((HEAP8[(((psrc)+(i-1))>>0)])|0));
    return pdest|0;
}
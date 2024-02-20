function _strcpy(pdest, psrc) {
    pdest = pdest|0; psrc = psrc|0;
    var i = 0;
    do {
      HEAP8[(((pdest+i)|0)>>0)]=HEAP8[(((psrc+i)|0)>>0)];
      i = (i+1)|0;
    } while (((HEAP8[(((psrc)+(i-1))>>0)])|0));
    return pdest|0;
}
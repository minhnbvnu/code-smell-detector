function appendrs (data, dlen, ecbuf, eclen) {
    var i, j, fb

    for (i = 0; i < eclen; i++) { strinbuf[ecbuf + i] = 0 }
    for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]]
      if (fb != 255) /* fb term is non-zero */
      {
        for (j = 1; j < eclen; j++) { strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])] }
      } else {
        for (j = ecbuf; j < ecbuf + eclen; j++) { strinbuf[j] = strinbuf[j + 1] }
      }
      strinbuf[ ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])]
    }
  }
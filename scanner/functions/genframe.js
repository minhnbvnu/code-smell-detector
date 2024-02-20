function genframe (instring) {
    var x, y, k, t, v, i, j, m

    // find the smallest version that fits the string
    t = instring.length
    version = 0
    do {
      version++
      k = (ecclevel - 1) * 4 + (version - 1) * 16
      neccblk1 = eccblocks[k++]
      neccblk2 = eccblocks[k++]
      datablkw = eccblocks[k++]
      eccblkwid = eccblocks[k]
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9)
      if (t <= k) { break }
    } while (version < 40)

    // FIXME - insure that it fits insted of being truncated
    width = 17 + 4 * version

    // allocate, clear and setup data structures
    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2
    for (t = 0; t < v; t++) { eccbuf[t] = 0 }
    strinbuf = instring.slice(0)

    for (t = 0; t < width * width; t++) { qrframe[t] = 0 }

    for (t = 0; t < (width * (width + 1) + 1) / 2; t++) { framask[t] = 0 }

    // insert finders - black to frame, white to mask
    for (t = 0; t < 3; t++) {
      k = 0
      y = 0
      if (t == 1) { k = (width - 7) }
      if (t == 2) { y = (width - 7) }
      qrframe[(y + 3) + width * (k + 3)] = 1
      for (x = 0; x < 6; x++) {
        qrframe[(y + x) + width * k] = 1
        qrframe[y + width * (k + x + 1)] = 1
        qrframe[(y + 6) + width * (k + x)] = 1
        qrframe[(y + x + 1) + width * (k + 6)] = 1
      }
      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1)
        setmask(y + 1, k + x + 1)
        setmask(y + 5, k + x)
        setmask(y + x + 1, k + 5)
      }
      for (x = 2; x < 4; x++) {
        qrframe[(y + x) + width * (k + 2)] = 1
        qrframe[(y + 2) + width * (k + x + 1)] = 1
        qrframe[(y + 4) + width * (k + x)] = 1
        qrframe[(y + x + 1) + width * (k + 4)] = 1
      }
    }

    // alignment blocks
    if (version > 1) {
      t = adelta[version]
      y = width - 7
      for (;;) {
        x = width - 7
        while (x > t - 3) {
          putalign(x, y)
          if (x < t) { break }
          x -= t
        }
        if (y <= t + 9) { break }
        y -= t
        putalign(6, y)
        putalign(y, 6)
      }
    }

    // single black
    qrframe[8 + width * (width - 8)] = 1

    // timing gap - mask only
    for (y = 0; y < 7; y++) {
      setmask(7, y)
      setmask(width - 8, y)
      setmask(7, y + width - 7)
    }
    for (x = 0; x < 8; x++) {
      setmask(x, 7)
      setmask(x + width - 8, 7)
      setmask(x, width - 8)
    }

    // reserve mask-format area
    for (x = 0; x < 9; x++) { setmask(x, 8) }
    for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8)
      setmask(8, x)
    }
    for (y = 0; y < 7; y++) { setmask(8, y + width - 7) }

    // timing row/col
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6)
        setmask(6, 8 + x)
      } else {
        qrframe[(8 + x) + width * 6] = 1
        qrframe[6 + width * (8 + x)] = 1
      }
    }

    // version block
    if (version > 6) {
      t = vpat[version - 7]
      k = 17
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> (k - 12) : t >> k)) {
            qrframe[(5 - x) + width * (2 - y + width - 11)] = 1
            qrframe[(2 - y + width - 11) + width * (5 - x)] = 1
          } else {
            setmask(5 - x, 2 - y + width - 11)
            setmask(2 - y + width - 11, 5 - x)
          }
        }
      }
    }

    // sync mask bits - only set above for white spaces, so add in black bits
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (qrframe[x + width * y]) { setmask(x, y) }
      }
    }

    // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
    v = strinbuf.length

    // string to array
    for (i = 0; i < v; i++) { eccbuf[i] = strinbuf.charCodeAt(i) }
    strinbuf = eccbuf.slice(0)

    // calculate max string length
    x = datablkw * (neccblk1 + neccblk2) + neccblk2
    if (v >= x - 2) {
      v = x - 2
      if (version > 9) { v-- }
    }

    // shift and repack to insert length prefix
    i = v
    if (version > 9) {
      strinbuf[i + 2] = 0
      strinbuf[i + 3] = 0
      while (i--) {
        t = strinbuf[i]
        strinbuf[i + 3] |= 255 & (t << 4)
        strinbuf[i + 2] = t >> 4
      }
      strinbuf[2] |= 255 & (v << 4)
      strinbuf[1] = v >> 4
      strinbuf[0] = 0x40 | (v >> 12)
    } else {
      strinbuf[i + 1] = 0
      strinbuf[i + 2] = 0
      while (i--) {
        t = strinbuf[i]
        strinbuf[i + 2] |= 255 & (t << 4)
        strinbuf[i + 1] = t >> 4
      }
      strinbuf[1] |= 255 & (v << 4)
      strinbuf[0] = 0x40 | (v >> 4)
    }
    // fill to end with pad pattern
    i = v + 3 - (version < 10)
    while (i < x) {
      strinbuf[i++] = 0xec
      // buffer has room    if (i == x)      break;
      strinbuf[i++] = 0x11
    }

    // calculate and append ECC

    // calculate generator polynomial
    genpoly[0] = 1
    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1
      for (j = i; j > 0; j--) {
        genpoly[j] = genpoly[j]
          ? genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1]
      }
      genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)]
    }
    for (i = 0; i <= eccblkwid; i++) { genpoly[i] = glog[genpoly[i]] } // use logs for genpoly[] to save calc step

    // append ecc to data buffer
    k = x
    y = 0
    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid)
      y += datablkw
      k += eccblkwid
    }
    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid)
      y += datablkw + 1
      k += eccblkwid
    }
    // interleave blocks
    y = 0
    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) { eccbuf[y++] = strinbuf[i + j * datablkw] }
      for (j = 0; j < neccblk2; j++) { eccbuf[y++] = strinbuf[(neccblk1 * datablkw) + i + (j * (datablkw + 1))] }
    }
    for (j = 0; j < neccblk2; j++) { eccbuf[y++] = strinbuf[(neccblk1 * datablkw) + i + (j * (datablkw + 1))] }
    for (i = 0; i < eccblkwid; i++) {
      for (j = 0; j < neccblk1 + neccblk2; j++) { eccbuf[y++] = strinbuf[x + i + j * eccblkwid] }
    }
    strinbuf = eccbuf

    // pack bits into frame avoiding masked area.
    x = y = width - 1
    k = v = 1 // up, minus
    /* inteleaved data and ecc codes */
    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2
    for (i = 0; i < m; i++) {
      t = strinbuf[i]
      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t) { qrframe[x + width * y] = 1 }
        do { // find next fill position
          if (v) { x-- } else {
            x++
            if (k) {
              if (y != 0) { y-- } else {
                x -= 2
                k = !k
                if (x == 6) {
                  x--
                  y = 9
                }
              }
            } else {
              if (y != width - 1) { y++ } else {
                x -= 2
                k = !k
                if (x == 6) {
                  x--
                  y -= 8
                }
              }
            }
          }
          v = !v
        } while (ismasked(x, y))
      }
    }

    // save pre-mask copy of frame
    strinbuf = qrframe.slice(0)
    t = 0 // best
    y = 30000 // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.
    for (k = 0; k < 8; k++) {
      applymask(k) // returns black-white imbalance
      x = badcheck()
      if (x < y) { // current mask better than previous best?
        y = x
        t = k
      }
      if (t == 7) { break } // don't increment i to a void redoing mask
      qrframe = strinbuf.slice(0) // reset for next pass
    }
    if (t != k) // redo best mask - none good enough, last wasn't t
    { applymask(t) }

    // add in final mask/ecclevel bytes
    y = fmtword[t + ((ecclevel - 1) << 3)]
    // low byte
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[(width - 1 - k) + width * 8] = 1
        if (k < 6) { qrframe[8 + width * k] = 1 } else { qrframe[8 + width * (k + 1)] = 1 }
      }
    }
    // high byte
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1
        if (k) { qrframe[(6 - k) + width * 8] = 1 } else { qrframe[7 + width * 8] = 1 }
      }
    }
    return qrframe
  }
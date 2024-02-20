function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
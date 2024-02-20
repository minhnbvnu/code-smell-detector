function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
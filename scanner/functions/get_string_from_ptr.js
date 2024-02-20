function get_string_from_ptr(ptr)
  {
	var ret = "";

	if (ptr == 0)
		return ret;

	var i = 0;
	while (1) {
  //    if ((ptr.pos + i) >= ptr.slab.length) { return "<< Invalid read: " + (ptr.pos+i) + " : " + ptr.slab.length + " >>"; } else {}
	if (heapU8[ptr + i] == 0)
		break;

      var t = String.fromCharCode(heapU8[ptr + i]);
      ret += t;
      i += 1;
    }

	return ret;
  }
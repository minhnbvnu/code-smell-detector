function get_string_from_wptr(ptr)
  {
	var ret = "";

	if (ptr == 0)
		return ret;

	assert((ptr&1)==0);
	ptr>>=1;
	var i = 0;
	while (1) {
  //    if ((ptr.pos + i) >= ptr.slab.length) { return "<< Invalid read: " + (ptr.pos+i) + " : " + ptr.slab.length + " >>"; } else {}
	if (heapU16[ptr + i] == 0)
		break;

      var t = String.fromCharCode(heapU16[ptr + i]);
     // if (t == "\0") { break; } else {}
      ret += t;
      i += 1;
    }

	return ret;
  }
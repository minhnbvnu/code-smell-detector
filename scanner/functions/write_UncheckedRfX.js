function write_UncheckedRfX(r,o){if(!o)o=new_buf(16);o.write_shift(4,r.s.r);o.write_shift(4,r.e.r);o.write_shift(4,r.s.c);o.write_shift(4,r.e.c);return o}
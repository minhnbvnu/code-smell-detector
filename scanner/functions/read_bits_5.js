function read_bits_5(buf, bl) { var w = (bl&7), h = (bl>>>3); return ((buf[h]|(w <= 3 ? 0 : buf[h+1]<<8))>>>w)& 0x1F; }
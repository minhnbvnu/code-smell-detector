function write_BrtCalcProp(data,o){if(!o)o=new_buf(26);o.write_shift(4,0);o.write_shift(4,1);o.write_shift(4,0);write_Xnum(0,o);o.write_shift(-4,1023);o.write_shift(1,51);o.write_shift(1,0);return o}
function parse_ws_xml_dim(ws,s){var d=safe_decode_range(s);if(d.s.r<=d.e.r&&d.s.c<=d.e.c&&d.s.r>=0&&d.s.c>=0)ws["!ref"]=encode_range(d)}
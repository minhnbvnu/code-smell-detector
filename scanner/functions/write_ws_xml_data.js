function write_ws_xml_data(ws,opts,idx,wb){var o=[],r=[],range=safe_decode_range(ws["!ref"]),cell,ref,rr="",cols=[],R,C;for(C=range.s.c;C<=range.e.c;++C)cols[C]=encode_col(C);for(R=range.s.r;R<=range.e.r;++R){r=[];rr=encode_row(R);for(C=range.s.c;C<=range.e.c;++C){ref=cols[C]+rr;if(ws[ref]===undefined)continue;if((cell=write_ws_xml_cell(ws[ref],ref,ws,opts,idx,wb))!=null)r.push(cell)}if(r.length>0)o[o.length]=writextag("row",r.join(""),{r:rr})}return o.join("")}
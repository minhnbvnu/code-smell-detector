function write_wb_xml(wb,opts){var o=[XML_HEADER];o[o.length]=WB_XML_ROOT;o[o.length]=writextag("workbookPr",null,{date1904:safe1904(wb)});o[o.length]="<sheets>";for(var i=0;i!=wb.SheetNames.length;++i)o[o.length]=writextag("sheet",null,{name:wb.SheetNames[i].substr(0,31),sheetId:""+(i+1),"r:id":"rId"+(i+1)});o[o.length]="</sheets>";if(o.length>2){o[o.length]="</workbook>";o[1]=o[1].replace("/>",">")}return o.join("")}
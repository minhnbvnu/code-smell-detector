function parse_xlml_data(xml,ss,data,cell,base,styles,csty,row,o){var nf="General",sid=cell.StyleID,S={};o=o||{};var interiors=[];if(sid===undefined&&row)sid=row.StyleID;if(sid===undefined&&csty)sid=csty.StyleID;while(styles[sid]!==undefined){if(styles[sid].nf)nf=styles[sid].nf;if(styles[sid].Interior)interiors.push(styles[sid].Interior);if(!styles[sid].Parent)break;sid=styles[sid].Parent}switch(data.Type){case"Boolean":cell.t="b";cell.v=parsexmlbool(xml);break;case"String":cell.t="s";cell.r=xlml_fixstr(unescapexml(xml));cell.v=xml.indexOf("<")>-1?ss:cell.r;break;case"DateTime":cell.v=(Date.parse(xml)-new Date(Date.UTC(1899,11,30)))/(24*60*60*1e3);if(cell.v!==cell.v)cell.v=unescapexml(xml);else if(cell.v>=1&&cell.v<60)cell.v=cell.v-1;if(!nf||nf=="General")nf="yyyy-mm-dd";case"Number":if(cell.v===undefined)cell.v=+xml;if(!cell.t)cell.t="n";break;case"Error":cell.t="e";cell.v=RBErr[xml];cell.w=xml;break;default:cell.t="s";cell.v=xlml_fixstr(ss);break}safe_format_xlml(cell,nf,o);if(o.cellFormula!=null&&cell.Formula){cell.f=rc_to_a1(unescapexml(cell.Formula),base);cell.Formula=undefined}if(o.cellStyles){interiors.forEach(function(x){if(!S.patternType&&x.patternType)S.patternType=x.patternType});cell.s=S}cell.ixfe=cell.StyleID!==undefined?cell.StyleID:"Default"}
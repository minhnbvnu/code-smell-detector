function Aw(e,r){if(e&&!e.SSF){e.SSF=yr(Z)}if(e&&e.SSF){$e();Ge(e.SSF);r.revssf=or(e.SSF);r.revssf[e.SSF[65535]]=0;r.ssf=e.SSF}r.rels={};r.wbrels={};r.Strings=[];r.Strings.Count=0;r.Strings.Unique=0;if(qd)r.revStrings=new Map;else{r.revStrings={};r.revStrings.foo=[];delete r.revStrings.foo}var t="bin";var a=true;var n=ti();ww(r=r||{});var i=Hr();var s="",f=0;r.cellXfs=[];tv(r.cellXfs,{},{revssf:{General:0}});if(!e.Props)e.Props={};s="docProps/core.xml";Wr(i,s,Ti(e.Props,r));n.coreprops.push(s);oi(r.rels,2,s,ii.CORE_PROPS);s="docProps/app.xml";if(e.Props&&e.Props.SheetNames){}else if(!e.Workbook||!e.Workbook.Sheets)e.Props.SheetNames=e.SheetNames;else{var l=[];for(var o=0;o<e.SheetNames.length;++o)if((e.Workbook.Sheets[o]||{}).Hidden!=2)l.push(e.SheetNames[o]);e.Props.SheetNames=l}e.Props.Worksheets=e.Props.SheetNames.length;Wr(i,s,Ai(e.Props,r));n.extprops.push(s);oi(r.rels,3,s,ii.EXT_PROPS);if(e.Custprops!==e.Props&&sr(e.Custprops||{}).length>0){s="docProps/custom.xml";Wr(i,s,Oi(e.Custprops,r));n.custprops.push(s);oi(r.rels,4,s,ii.CUST_PROPS)}for(f=1;f<=e.SheetNames.length;++f){var c={"!id":{}};var u=e.Sheets[e.SheetNames[f-1]];var h=(u||{})["!type"]||"sheet";switch(h){case"chart":;default:s="xl/worksheets/sheet"+f+"."+t;Wr(i,s,rm(f-1,r,e,c));n.sheets.push(s);oi(r.wbrels,-1,"worksheets/sheet"+f+"."+t,ii.WS[0]);}if(u){var d=u["!comments"];var v=false;var p="";if(d&&d.length>0){p="xl/comments"+f+"."+t;Wr(i,p,xu(d,r));n.comments.push(p);oi(c,-1,"../comments"+f+"."+t,ii.CMNT);v=true}if(u["!legacy"]){if(v)Wr(i,"xl/drawings/vmlDrawing"+f+".vml",du(f,u["!comments"]))}delete u["!comments"];delete u["!legacy"]}if(c["!id"].rId1)Wr(i,si(s),li(c))}if(r.Strings!=null&&r.Strings.length>0){s="xl/sharedStrings."+t;Wr(i,s,ql(r.Strings,r));n.strs.push(s);oi(r.wbrels,-1,"sharedStrings."+t,ii.SST)}s="xl/workbook."+t;Wr(i,s,Mm(e,r));n.workbooks.push(s);oi(r.rels,1,s,ii.WB);s="xl/theme/theme1.xml";var m=Hc(e.Themes,r);Wr(i,s,m);n.themes.push(s);oi(r.wbrels,-1,"theme/theme1.xml",ii.THEME);s="xl/styles."+t;Wr(i,s,Rc(e,r));n.styles.push(s);oi(r.wbrels,-1,"styles."+t,ii.STY);if(e.vbaraw&&a){s="xl/vbaProject.bin";Wr(i,s,e.vbaraw);n.vba.push(s);oi(r.wbrels,-1,"vbaProject.bin",ii.VBA)}s="xl/metadata."+t;Wr(i,s,nu());n.metadata.push(s);oi(r.wbrels,-1,"metadata."+t,ii.XLMETA);Wr(i,"[Content_Types].xml",ni(n,r));Wr(i,"_rels/.rels",li(r.rels));Wr(i,"xl/_rels/workbook."+t+".rels",li(r.wbrels));delete r.revssf;delete r.ssf;return i}
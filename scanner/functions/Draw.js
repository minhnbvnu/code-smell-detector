function Draw(t){var o;_classCallCheck(this,Draw);(o=r.call(this,_,"draw",!0)).anchorType=(0,d.getStringOption)(t.anchorType,["topLeft","bottomCenter","bottomLeft","bottomRight","middleCenter","middleLeft","middleRight","topCenter","topRight"]);o.colSpan=(0,d.getInteger)({data:t.colSpan,defaultValue:1,validate:function validate(t){return t>=1||-1===t}});o.h=t.h?(0,d.getMeasurement)(t.h):"";o.hAlign=(0,d.getStringOption)(t.hAlign,["left","center","justify","justifyAll","radix","right"]);o.id=t.id||"";o.locale=t.locale||"";o.maxH=(0,d.getMeasurement)(t.maxH,"0pt");o.maxW=(0,d.getMeasurement)(t.maxW,"0pt");o.minH=(0,d.getMeasurement)(t.minH,"0pt");o.minW=(0,d.getMeasurement)(t.minW,"0pt");o.name=t.name||"";o.presence=(0,d.getStringOption)(t.presence,["visible","hidden","inactive","invisible"]);o.relevant=(0,d.getRelevant)(t.relevant);o.rotate=(0,d.getInteger)({data:t.rotate,defaultValue:0,validate:function validate(t){return t%90==0}});o.use=t.use||"";o.usehref=t.usehref||"";o.w=t.w?(0,d.getMeasurement)(t.w):"";o.x=(0,d.getMeasurement)(t.x,"0pt");o.y=(0,d.getMeasurement)(t.y,"0pt");o.assist=null;o.border=null;o.caption=null;o.desc=null;o.extras=null;o.font=null;o.keep=null;o.margin=null;o.para=null;o.traversal=null;o.ui=null;o.value=null;o.setProperty=new c.XFAObjectArray;return o}
function getColWidth(e,o,t){var n=getColumnIndex(e.id),l=$('<div class="slick-row ui-widget-content"></div>'),r=$('<div class="slick-cell"></div>');r.css({position:"absolute",visibility:"hidden","text-overflow":"initial","white-space":"nowrap"}),l.append(r),o.append(l);var i,a,s,d,c=0;return canvas_context&&e.autoSize.widthEvalMode===Slick.WidthEvalMode.CanvasTextSize?(canvas_context.font=r.css("font-size")+" "+r.css("font-family"),$(t).each((function(o,t){d=Array.isArray(t)?t[e.field]:t,(i=(a=""+d)?canvas_context.measureText(a).width:0)>c&&(c=i,s=a)})),r.html(s),i=r.outerWidth(),l.remove(),r=null,i):($(t).each((function(o,t){d=Array.isArray(t)?t[e.field]:t,applyFormatResultToCellNode(e.formatterOverride?e.formatterOverride(o,n,d,e,t,self):e.formatter?e.formatter(o,n,d,e,t,self):""+d,r[0]),(i=r.outerWidth())>c&&(c=i)})),l.remove(),r=null,c)}
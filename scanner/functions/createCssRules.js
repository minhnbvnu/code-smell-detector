function createCssRules(){$style=$("<style type='text/css' rel='stylesheet' />"),$container[0].parentNode instanceof ShadowRoot?$container[0].parentNode.insertBefore($style[0],$container[0]):$style.appendTo($("head"));for(var e=options.rowHeight-cellHeightDiff,o=["."+uid+" .slick-group-header-column { left: 1000px; }","."+uid+" .slick-header-column { left: 1000px; }","."+uid+" .slick-top-panel { height:"+options.topPanelHeight+"px; }","."+uid+" .slick-preheader-panel { height:"+options.preHeaderPanelHeight+"px; }","."+uid+" .slick-headerrow-columns { height:"+options.headerRowHeight+"px; }","."+uid+" .slick-footerrow-columns { height:"+options.footerRowHeight+"px; }","."+uid+" .slick-cell { height:"+e+"px; }","."+uid+" .slick-row { height:"+options.rowHeight+"px; }"],t=0;t<columns.length;t++)o.push("."+uid+" .l"+t+" { }"),o.push("."+uid+" .r"+t+" { }");$style[0].styleSheet?$style[0].styleSheet.cssText=o.join(" "):$style[0].appendChild(document.createTextNode(o.join(" ")))}
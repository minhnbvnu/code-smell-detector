function appendCellHtml(e,o,t,n,l){var r=columns[t],i="slick-cell l"+t+" r"+Math.min(columns.length-1,t+n-1)+(r.cssClass?" "+r.cssClass:"");for(var a in hasFrozenColumns()&&t<=options.frozenColumn&&(i+=" frozen"),o===activeRow&&t===activeCell&&options.showCellSelection&&(i+=" active"),cellCssClasses)cellCssClasses[a][o]&&cellCssClasses[a][o][r.id]&&(i+=" "+cellCssClasses[a][o][r.id]);var s=null,d="";l&&(s=getDataItemValueForColumn(l,r),null==(d=getFormatter(o,r)(o,t,s,r,l,self))&&(d=""));var c=trigger(self.onBeforeAppendCell,{row:o,cell:t,value:s,dataContext:l})||"";c+=d&&d.addClasses?(c?" ":"")+d.addClasses:"";var u=d&&d.toolTip?"title='"+d.toolTip+"'":"",h="";if(r.hasOwnProperty("cellAttrs")&&r.cellAttrs instanceof Object)for(var a in r.cellAttrs)r.cellAttrs.hasOwnProperty(a)&&(h+=" "+a+'="'+r.cellAttrs[a]+'" ');e.push("<div class='"+i+(c?" "+c:"")+"' "+u+h+">"),l&&e.push("[object Object]"!==Object.prototype.toString.call(d)?d:d.text),e.push("</div>"),rowsCache[o].cellRenderQueue.push(t),rowsCache[o].cellColSpans[t]=n}
function Annotation(t){_classCallCheck(this,Annotation);var r=t.dict;this.setTitle(r.get("T"));this.setContents(r.get("Contents"));this.setModificationDate(r.get("M"));this.setFlags(r.get("F"));this.setRectangle(r.getArray("Rect"));this.setColor(r.getArray("C"));this.setBorderStyle(r);this.setAppearance(r);this.setOptionalContent(r);var o=r.get("MK");this.setBorderAndBackgroundColors(o);this.setRotation(o);this._streams=[];this.appearance&&this._streams.push(this.appearance);this.data={annotationFlags:this.flags,borderStyle:this.borderStyle,color:this.color,backgroundColor:this.backgroundColor,borderColor:this.borderColor,rotation:this.rotation,contentsObj:this._contents,hasAppearance:!!this.appearance,id:t.id,modificationDate:this.modificationDate,rect:this.rectangle,subtype:t.subtype,hasOwnCanvas:!1};if(t.collectFields){var u=r.get("Kids");if(Array.isArray(u)){var d,g=[],y=_createForOfIteratorHelper(u);try{for(y.s();!(d=y.n()).done;){var m=d.value;m instanceof h.Ref&&g.push(m.toString())}}catch(t){y.e(t)}finally{y.f()}0!==g.length&&(this.data.kidIds=g)}this.data.actions=(0,l.collectActions)(t.xref,r,c.AnnotationActionEventType);this.data.fieldName=this._constructFieldName(r);this.data.pageIndex=t.pageIndex}this._fallbackFontDict=null}
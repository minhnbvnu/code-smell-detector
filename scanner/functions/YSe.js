function YSe(){return ZL||(ZL=Fa.fromClass(class{constructor(e){this.view=e,this.decorations=It.none,this.decorationCache=Object.create(null),this.decorator=this.makeDecorator(e.state.facet(Jm)),this.decorations=this.decorator.createDeco(e)}makeDecorator(e){return new ZSe({regexp:e.specialChars,decoration:(t,r,n)=>{let{doc:i}=r.state,a=Tl(t[0],0);if(a==9){let l=i.lineAt(n),s=r.state.tabSize,u=np(l.text,s,n-l.from);return It.replace({widget:new ewe((s-u%s)*this.view.defaultCharacterWidth/this.view.scaleX)})}return this.decorationCache[a]||(this.decorationCache[a]=It.replace({widget:new JSe(e,a)}))},boundary:e.replaceTabs?void 0:/[^]/})}update(e){let t=e.state.facet(Jm);e.startState.facet(Jm)!=t?(this.decorator=this.makeDecorator(t),this.decorations=this.decorator.createDeco(e.view)):this.decorations=this.decorator.updateDeco(e,this.decorations)}},{decorations:e=>e.decorations}))}
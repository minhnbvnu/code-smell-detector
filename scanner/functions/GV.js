function GV(n,t,e){let i,r={};class o extends t{static _finalizeClass(){if(!this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this)))t._finalizeClass.call(this);else{if(i)for(let l=0,c;l<i.length;l++)c=i[l],c.properties&&this.createProperties(c.properties),c.observers&&this.createObservers(c.observers,c.properties);n.properties&&this.createProperties(n.properties),n.observers&&this.createObservers(n.observers,n.properties),this._prepareTemplate()}}static get properties(){let l={};if(i)for(let c=0;c<i.length;c++)Q4(l,i[c].properties);return Q4(l,n.properties),l}static get observers(){let l=[];if(i)for(let c=0,u;c<i.length;c++)u=i[c],u.observers&&(l=l.concat(u.observers));return n.observers&&(l=l.concat(n.observers)),l}created(){super.created();let l=r.created;if(l)for(let c=0;c<l.length;c++)l[c].call(this)}_registered(){let l=o.prototype;if(!l.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",l))){l.__hasRegisterFinished=!0,super._registered(),Gr&&s(l);let c=Object.getPrototypeOf(this),u=r.beforeRegister;if(u)for(let h=0;h<u.length;h++)u[h].call(c);if(u=r.registered,u)for(let h=0;h<u.length;h++)u[h].call(c)}}_applyListeners(){super._applyListeners();let l=r.listeners;if(l)for(let c=0;c<l.length;c++){let u=l[c];if(u)for(let h in u)this._addMethodEventListenerToNode(this,h,u[h])}}_ensureAttributes(){let l=r.hostAttributes;if(l)for(let c=l.length-1;c>=0;c--){let u=l[c];for(let h in u)this._ensureAttribute(h,u[h])}super._ensureAttributes()}ready(){super.ready();let l=r.ready;if(l)for(let c=0;c<l.length;c++)l[c].call(this)}attached(){super.attached();let l=r.attached;if(l)for(let c=0;c<l.length;c++)l[c].call(this)}detached(){super.detached();let l=r.detached;if(l)for(let c=0;c<l.length;c++)l[c].call(this)}attributeChanged(l,c,u){super.attributeChanged();let h=r.attributeChanged;if(h)for(let p=0;p<h.length;p++)h[p].call(this,l,c,u)}}if(e){Array.isArray(e)||(e=[e]);let a=t.prototype.behaviors;i=i5(e,null,a),o.prototype.behaviors=a?a.concat(e):i}let s=a=>{i&&WV(a,i,r),n5(a,n,r,e5)};return Gr||s(o.prototype),o.generatedFrom=n,o}
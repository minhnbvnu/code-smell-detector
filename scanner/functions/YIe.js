function YIe(e,t,r){switch(e.length){case 1:return mT(e[0],t,r,!0);default:var n="",i=uM(e);i.array&&i.object&&(n=i.null?"(":"(!"+t+" || ",n+="typeof "+t+' !== "object")',delete i.null,delete i.array,delete i.object),i.number&&delete i.integer;for(var a in i)n+=(n?" && ":"")+mT(a,t,r,!0);return n}}
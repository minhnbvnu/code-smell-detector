function Pae(e,t){let r=e.dom,{children:n}=e,i=0;for(let a=0;i<n.length;i++){let l=n[i],s=a+l.length;if(!(s==a&&l.getSide()<=0)){if(t>a&&t<s&&l.dom.parentNode==r)return l.domAtPos(t-a);if(t<=a)break;a=s}}for(let a=i;a>0;a--){let l=n[a-1];if(l.dom.parentNode==r)return l.domAtPos(l.length)}for(let a=i;a<n.length;a++){let l=n[a];if(l.dom.parentNode==r)return l.domAtPos(0)}return new oi(r,0)}
function E8(n,t,e,i){function r(c){return c.length?c.pop()+" ":""}function o(c,u,h,p,d,f){if(c!==h||u!==p){var m=d.push("translate(",null,t,null,e);f.push({i:m-4,x:$n(c,h)},{i:m-2,x:$n(u,p)})}else(h||p)&&d.push("translate("+h+t+p+e)}function s(c,u,h,p){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),p.push({i:h.push(r(h)+"rotate(",null,i)-2,x:$n(c,u)})):u&&h.push(r(h)+"rotate("+u+i)}function a(c,u,h,p){c!==u?p.push({i:h.push(r(h)+"skewX(",null,i)-2,x:$n(c,u)}):u&&h.push(r(h)+"skewX("+u+i)}function l(c,u,h,p,d,f){if(c!==h||u!==p){var m=d.push(r(d)+"scale(",null,",",null,")");f.push({i:m-4,x:$n(c,h)},{i:m-2,x:$n(u,p)})}else(h!==1||p!==1)&&d.push(r(d)+"scale("+h+","+p+")")}return function(c,u){var h=[],p=[];return c=n(c),u=n(u),o(c.translateX,c.translateY,u.translateX,u.translateY,h,p),s(c.rotate,u.rotate,h,p),a(c.skewX,u.skewX,h,p),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,h,p),c=u=null,function(d){for(var f=-1,m=p.length,x;++f<m;)h[(x=p[f]).i]=x.x(d);return h.join("")}}}
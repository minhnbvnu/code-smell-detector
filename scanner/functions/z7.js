function z7(n){let t=Vy(n);if(!t)return console.warn("Could not find style data in module named",n),[];if(t._styles===void 0){let e=[];e.push(...Hy(t));let i=t.querySelector("template");i&&e.push(...lf(i,t.assetpath)),t._styles=e}return t._styles}
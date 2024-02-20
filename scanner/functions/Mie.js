function Mie(e,t,r){if(t.length===0)return r(new Error("No authentication methods left to try"));var i=t.shift(),a=process.hasOwnProperty("getuid")?process.getuid():0,n=Uie(a);function s(){qie(e,function(o){var u=o.toString("ascii").match(/^([A-Za-z]+) (.*)/);if(u&&u[1]==="OK")return e.write(`BEGIN\r
`),r(null,u[2]);if(!t.empty)Mie(e,t,r);else return r(o)})}switch(i){case"EXTERNAL":e.write(`AUTH ${i} ${n}\r
`),s();break;case"DBUS_COOKIE_SHA1":e.write(`AUTH ${i} ${n}\r
`),qie(e,function(o){var u=jie.from(o.toString().split(" ")[1].trim(),"hex").toString().split(" "),l=u[0],p=u[1],c=u[2],d=Lie.randomBytes(16).toString("hex");bFe(l,p,function(f,m){if(f)return r(f);var h=yFe([c,d,m].join(":")),g=Uie(d+h);e.write(`DATA ${g}\r
`),s()})});break;case"ANONYMOUS":e.write(`AUTH ANONYMOUS \r
`),s();break;default:console.error(`Unsupported auth method: ${i}`),s();break}}
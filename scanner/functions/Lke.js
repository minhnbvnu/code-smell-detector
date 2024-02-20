function Lke(){let e=[];try{e=U1.readFileSync("/etc/os-release",{encoding:"utf8"}).split(`
`)}catch{return!1}let t=WE(e,"id");return t&&t.indexOf("raspbian")>-1}
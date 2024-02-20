function HIe(){let e=[];try{e=G1.readFileSync("/etc/os-release",{encoding:"utf8"}).split(`
`)}catch{return!1}let t=Q_(e,"id");return t&&t.indexOf("raspbian")>-1}
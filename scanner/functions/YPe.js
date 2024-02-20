function YPe(){let e={},t={primaryDNS:"",exitCode:0,ifaces:[]};try{return Mi("ipconfig /all",Rt.execOptsWin).split(`\r
\r
`).forEach((a,n)=>{if(n==1){let s=a.split(`\r
`).filter(u=>u.toUpperCase().includes("DNS")),o=s[0].substring(s[0].lastIndexOf(":")+1);t.primaryDNS=o.trim(),t.primaryDNS||(t.primaryDNS="Not defined")}if(n>1)if(n%2==0){let s=a.substring(a.lastIndexOf(" ")+1).replace(":","");e.name=s}else{let s=a.split(`\r
`).filter(u=>u.toUpperCase().includes("DNS")),o=s[0].substring(s[0].lastIndexOf(":")+1);e.dnsSuffix=o.trim(),t.ifaces.push(e),e={}}}),t}catch{return{primaryDNS:"",exitCode:0,ifaces:[]}}}
function lAe(e){return new Promise(t=>{process.nextTick(()=>{let r=[];nAe?u_("nmcli --terse --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null",{maxBuffer:1024*2e4},function(a,n){let s=n.toString().split("ACTIVE:");s.shift(),s.forEach(o=>{o="ACTIVE:"+o;let u=o.split(tg.EOL),l=Ds.getValue(u,"CHAN"),p=Ds.getValue(u,"FREQ").toLowerCase().replace("mhz","").trim(),c=Ds.getValue(u,"SECURITY").replace("(","").replace(")",""),f=Ds.getValue(u,"WPA-FLAGS").replace("(","").replace(")",""),d=Ds.getValue(u,"RSN-FLAGS").replace("(","").replace(")","");r.push({ssid:Ds.getValue(u,"SSID"),bssid:Ds.getValue(u,"BSSID"),mode:Ds.getValue(u,"MODE"),channel:l?parseInt(l,10):-1,frequency:p?parseInt(p,10):-1,signalLevel:pZ(Ds.getValue(u,"SIGNAL")),quality:parseFloat(Ds.getValue(u,"SIGNAL")),security:c&&c!=="none"?c.split(" "):[],wpaFlags:f&&f!=="none"?f.split(" "):[],rsnFlags:d&&d!=="none"?d.split(" "):[]})}),e&&e(r),t(r)}):sAe?u_("/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s",{maxBuffer:1024*2e4},function(a,n){let s=n.toString().split(tg.EOL);if(s&&s.length>1){let o=Ds.parseHead(s[0],1);o.length>=7&&(s.shift(),s.forEach(u=>{if(u.trim()){let l=u.substring(o[3].from,o[3].to).trim(),p=l?parseInt(l,10):-1,c=u.substring(o[2].from,o[2].to).trim(),f=u.substring(o[6].from,1e3).trim().split(" "),d=[],m=[];f.forEach(h=>{if(h.indexOf("(")>0){let g=h.split("(");d.push(g[0]),m=m.concat(g[1].replace(")","").split(","))}}),m=Array.from(new Set(m)),r.push({ssid:u.substring(o[0].from,o[0].to).trim(),bssid:u.substring(o[1].from,o[1].to).trim(),mode:"",channel:p,frequency:cZ(p),signalLevel:c?parseInt(c,10):-1,quality:uAe(c),security:d,wpaFlags:m,rsnFlags:[]})}}))}e&&e(r),t(r)}):oAe?u_("chcp 65001 && netsh wlan show networks mode=Bssid",Ds.execOptsWin,function(a,n){let s=n.toString("utf8").split(tg.EOL+tg.EOL+"SSID ");s.shift(),s.forEach(o=>{let u=o.split(tg.EOL);if(u&&u.length>=8&&u[0].indexOf(":")>=0){let l=u[4].split(":");l.shift(),l=l.join(":").trim();let p=u[7].split(":").pop().trim(),c=u[5].split(":").pop().trim();r.push({ssid:u[0].split(":").pop().trim(),bssid:l,mode:"",channel:p?parseInt(p,10):-1,frequency:cZ(p),signalLevel:pZ(c),quality:c?parseInt(c,10):-1,security:[u[2].split(":").pop().trim()],wpaFlags:[u[3].split(":").pop().trim()],rsnFlags:[]})}}),e&&e(r),t(r)}):(e&&e(r),t(r))})})}
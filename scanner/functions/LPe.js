function LPe(e){function t(o){let u=[],l=-1,p=-1,c=[],d=[],f={vendor:"",model:"",bus:"",vram:-1,vramDynamic:!1},m={vendor:"",model:"",main:!1,builtin:!1,connection:"",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:-1,resolutiony:-1,currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1};for(let h=0;h<o.length;h++)if(o[h].trim()!==""){let g=o[h].search(/\S|$/);u.indexOf(g)===-1&&u.push(g),l=u.indexOf(g),l<p&&(Object.keys(f).length>0&&(c.push(f),f={vendor:"",model:"",bus:"",vram:-1,vramDynamic:!1}),Object.keys(m).length>0&&(d.push(m),m={vendor:"",model:"",main:!1,builtin:!1,connection:"",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:-1,resolutiony:-1,currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1})),p=l;let y=o[h].split(":");if(l===2&&(y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("chipsetmodel")!==-1&&(f.model=y[1].trim()),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("bus")!==-1&&(f.bus=y[1].trim()),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("vendor")!==-1&&(f.vendor=y[1].split("(")[0].trim()),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("vram(total)")!==-1&&(f.vram=parseInt(y[1]),y[1].toLowerCase().indexOf("gb")!==-1&&(f.vram=f.vram*1024),f.vramDynamic=!1),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("vram(dynamic,max)")!==-1&&(f.vram=parseInt(y[1]),y[1].toLowerCase().indexOf("gb")!==-1&&(f.vram=f.vram*1024),f.vramDynamic=!0)),l===3&&y.length>1&&y[1]===""&&(m.vendor="",m.model=y[0].trim(),m.main=!1,m.builtin=!1,m.connection="",m.sizex=-1,m.sizey=-1,m.positionX=0,m.positionY=0,m.pixeldepth=-1),l===4){if(y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("resolution")!==-1){let S=y[1].split("x");m.resolutionx=S.length>1?parseInt(S[0]):0,m.resolutiony=S.length>1?parseInt(S[1]):0,m.currentResX=m.resolutionx,m.currentResY=m.resolutiony}y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("pixeldepth")!==-1&&(m.pixeldepth=parseInt(y[1])),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("framebufferdepth")!==-1&&(m.pixeldepth=parseInt(y[1])),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("maindisplay")!==-1&&y[1].replace(/ +/g,"").toLowerCase()==="yes"&&(m.main=!0),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("built-in")!==-1&&y[1].replace(/ +/g,"").toLowerCase()==="yes"&&(m.builtin=!0,m.connection=""),y.length>1&&y[0].replace(/ +/g,"").toLowerCase().indexOf("connectiontype")!==-1&&(m.builtin=!1,m.connection=y[1].trim())}}return Object.keys(f).length>0&&c.push(f),Object.keys(m).length>0&&d.push(m),{controllers:c,displays:d}}function r(o){let u=[],l={vendor:"",model:"",bus:"",vram:-1,vramDynamic:!1},p=!1,c=[];try{c=TPe('export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "').toString().split(`
`);for(let d=0;d<c.length;d++)c[d]=c[d].replace("Bus Address:","").replace("0000:","").trim();c=c.filter(function(d){return d!=null&&d})}catch{kt.noop()}for(let d=0;d<o.length;d++)if(o[d].trim()!==""){if(o[d][0]!==" "&&o[d][0]!=="	"){let f=c.indexOf(o[d].split(" ")[0])>=0,m=o[d].toLowerCase().indexOf(" vga "),h=o[d].toLowerCase().indexOf("3d controller");if(m!==-1||h!==-1){h!==-1&&m===-1&&(m=h),(l.vendor||l.model||l.bus||l.vram!==-1||l.vramDynamic)&&(u.push(l),l={vendor:"",model:"",bus:"",vram:-1,vramDynamic:!1}),p=!0;let g=o[d].search(/\[[0-9a-f]{4}:[0-9a-f]{4}]|$/),y=o[d].substr(m,g-m).split(":");y.length>1&&(y[1]=y[1].trim(),y[1].toLowerCase().indexOf("corporation")>=0?(l.vendor=y[1].substr(0,y[1].toLowerCase().indexOf("corporation")+11).trim(),l.model=y[1].substr(y[1].toLowerCase().indexOf("corporation")+11,200).trim().split("(")[0],l.bus=c.length>0&&f?"PCIe":"Onboard",l.vram=-1,l.vramDynamic=!1):y[1].toLowerCase().indexOf(" inc.")>=0?((y[1].match(new RegExp("]","g"))||[]).length>1?(l.vendor=y[1].substr(0,y[1].toLowerCase().indexOf("]")+1).trim(),l.model=y[1].substr(y[1].toLowerCase().indexOf("]")+1,200).trim().split("(")[0].trim()):(l.vendor=y[1].substr(0,y[1].toLowerCase().indexOf(" inc.")+5).trim(),l.model=y[1].substr(y[1].toLowerCase().indexOf(" inc.")+5,200).trim().split("(")[0].trim()),l.bus=c.length>0&&f?"PCIe":"Onboard",l.vram=-1,l.vramDynamic=!1):y[1].toLowerCase().indexOf(" ltd.")>=0&&((y[1].match(new RegExp("]","g"))||[]).length>1?(l.vendor=y[1].substr(0,y[1].toLowerCase().indexOf("]")+1).trim(),l.model=y[1].substr(y[1].toLowerCase().indexOf("]")+1,200).trim().split("(")[0].trim()):(l.vendor=y[1].substr(0,y[1].toLowerCase().indexOf(" ltd.")+5).trim(),l.model=y[1].substr(y[1].toLowerCase().indexOf(" ltd.")+5,200).trim().split("(")[0].trim())))}else p=!1}if(p){let f=o[d].split(":");if(f.length>1&&f[0].replace(/ +/g,"").toLowerCase().indexOf("devicename")!==-1&&f[1].toLowerCase().indexOf("onboard")!==-1&&(l.bus="Onboard"),f.length>1&&f[0].replace(/ +/g,"").toLowerCase().indexOf("region")!==-1&&f[1].toLowerCase().indexOf("memory")!==-1){let m=f[1].split("=");m.length>1&&(l.vram=parseInt(m[1]))}}}return(l.vendor||l.model||l.bus||l.vram!==-1||l.vramDynamic)&&u.push(l),u}function i(o){let u={vendor:"",model:"",main:!1,builtin:!1,connection:"",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:-1,resolutiony:-1,currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1},l=108;if(o.substr(l,6)==="000000"&&(l+=36),o.substr(l,6)==="000000"&&(l+=36),o.substr(l,6)==="000000"&&(l+=36),o.substr(l,6)==="000000"&&(l+=36),u.resolutionx=parseInt("0x0"+o.substr(l+8,1)+o.substr(l+4,2)),u.resolutiony=parseInt("0x0"+o.substr(l+14,1)+o.substr(l+10,2)),u.sizex=parseInt("0x0"+o.substr(l+28,1)+o.substr(l+24,2)),u.sizey=parseInt("0x0"+o.substr(l+29,1)+o.substr(l+26,2)),l=o.indexOf("000000fc00"),l>=0){let p=o.substr(l+10,26);p.indexOf("0a")!==-1&&(p=p.substr(0,p.indexOf("0a")));try{p.length>2&&(u.model=p.match(/.{1,2}/g).map(function(c){return String.fromCharCode(parseInt(c,16))}).join(""))}catch{kt.noop()}}else u.model="";return u}function a(o,u){let l=[],p={vendor:"",model:"",main:!1,builtin:!1,connection:"",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:-1,resolutiony:-1,currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1},c=!1,d=!1,f="",m=0;for(let h=1;h<o.length;h++)if(o[h].trim()!==""){if(o[h][0]!==" "&&o[h][0]!=="	"&&o[h].toLowerCase().indexOf(" connected ")!==-1){(p.model||p.main||p.builtin||p.connection||p.sizex!==-1||p.pixeldepth!==-1||p.resolutionx!==-1)&&(l.push(p),p={vendor:"",model:"",main:!1,builtin:!1,connection:"",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:-1,resolutiony:-1,currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1});let g=o[h].split(" ");p.connection=g[0],p.main=o[h].toLowerCase().indexOf(" primary ")>=0,p.builtin=g[0].toLowerCase().indexOf("edp")>=0}if(c)if(o[h].search(/\S|$/)>m)f+=o[h].toLowerCase().trim();else{let g=i(f);p.vendor=g.vendor,p.model=g.model,p.resolutionx=g.resolutionx,p.resolutiony=g.resolutiony,p.sizex=g.sizex,p.sizey=g.sizey,p.pixeldepth=u,c=!1}if(o[h].toLowerCase().indexOf("edid:")>=0&&(c=!0,m=o[h].search(/\S|$/)),o[h].toLowerCase().indexOf("*current")>=0){let g=o[h].split("(");if(g&&g.length>1&&g[0].indexOf("x")>=0){let y=g[0].trim().split("x");p.currentResX=kt.toInt(y[0]),p.currentResY=kt.toInt(y[1])}d=!0}if(d&&o[h].toLowerCase().indexOf("clock")>=0&&o[h].toLowerCase().indexOf("hz")>=0&&o[h].toLowerCase().indexOf("v: height")>=0){let g=o[h].split("clock");g&&g.length>1&&g[1].toLowerCase().indexOf("hz")>=0&&(p.currentRefreshRate=kt.toInt(g[1])),d=!1}}return(p.model||p.main||p.builtin||p.connection||p.sizex!==-1||p.pixeldepth!==-1||p.resolutionx!==-1)&&l.push(p),l}return new Promise(o=>{process.nextTick(()=>{let u={controllers:[],displays:[]};if(IPe&&wg("system_profiler SPDisplaysDataType",function(p,c){if(!p){let d=c.toString().split(`
`);u=t(d)}e&&e(u),o(u)}),APe&&(kt.isRaspberry()&&kt.isRaspbian()?wg(`fbset -s | grep 'mode "'; vcgencmd get_mem gpu; tvservice -s; tvservice -n;`,function(p,c){let d=c.toString().split(`
`);if(d.length>3&&d[0].indexOf('mode "')>=-1&&d[2].indexOf("0x12000a")>-1){let f=d[0].replace("mode","").replace(/"/g,"").trim().split("x");f.length===2&&u.displays.push({vendor:"",model:kt.getValue(d,"device_name","="),main:!0,builtin:!1,connection:"HDMI",sizex:-1,sizey:-1,pixeldepth:-1,resolutionx:parseInt(f[0],10),resolutiony:parseInt(f[1],10),currentResX:-1,currentResY:-1,positionX:0,positionY:0,currentRefreshRate:-1})}d.length>1&&d[1].indexOf("gpu=")>=-1&&u.controllers.push({vendor:"Broadcom",model:"VideoCore IV",bus:"",vram:d[1].replace("gpu=",""),vramDynamic:!0}),e&&e(u),o(u)}):wg("lspci -vvv  2>/dev/null",function(p,c){if(!p){let f=c.toString().split(`
`);u.controllers=r(f)}wg("xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'",function(f,m){let h=0;if(!f){let y=m.toString().split(`
`);h=parseInt(y[0])||0}wg("xrandr --verbose 2>/dev/null",function(y,S){if(!y){let x=S.toString().split(`
`);u.displays=a(x,h)}e&&e(u),o(u)})})})),(OPe||FPe||NPe)&&(e&&e(u),o(u)),jPe&&(e&&e(u),o(u)),PPe)try{let l=[];l.push(kt.wmic("path win32_VideoController get /value")),l.push(kt.wmic("path win32_desktopmonitor get /value")),l.push(kt.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl")),l.push(kt.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens")),l.push(kt.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl")),l.push(kt.powerShell('gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}')),Promise.all(l).then(p=>{let c=p[0].split(/\n\s*\n/);u.controllers=n(c);let d=p[1].split(/\n\s*\n/);d.shift(),d.pop();let f=p[2].split("Active ");f.shift();let m=p[3].split("BitsPerPixel ");m.shift();let h=p[4].split(/\n\s*\n/);h.shift();let g=p[5].split(/\r\n/),y=[];g.forEach(S=>{let x=S.split("|");x.length===5&&y.push({vendor:x[0],code:x[1],model:x[2],serial:x[3],instanceId:x[4]})}),u.displays=s(m,f,d,h,y),u.displays.length===1&&(Sg&&(u.displays[0].resolutionx=Sg,u.displays[0].currentResX||(u.displays[0].currentResX=Sg)),Eg&&(u.displays[0].resolutiony=Eg,u.displays[0].currentResY===0&&(u.displays[0].currentResY=Eg)),V3&&(u.displays[0].pixeldepth=V3),z3&&!u.displays[0].refreshrate&&(u.displays[0].currentRefreshRate=z3)),e&&e(u),o(u)}).catch(()=>{e&&e(u),o(u)})}catch{e&&e(u),o(u)}})});function n(o){let u=[];for(let l in o)if({}.hasOwnProperty.call(o,l)&&o[l].trim()!==""){let p=o[l].trim().split(`\r
`);u.push({vendor:kt.getValue(p,"AdapterCompatibility","="),model:kt.getValue(p,"name","="),bus:kt.getValue(p,"PNPDeviceID","=").startsWith("PCI")?"PCI":"",vram:parseInt(kt.getValue(p,"AdapterRAM","="),10)/1024/1024,vramDynamic:kt.getValue(p,"VideoMemoryType","=")==="2"}),Sg=kt.toInt(kt.getValue(p,"CurrentHorizontalResolution","="))||Sg,Eg=kt.toInt(kt.getValue(p,"CurrentVerticalResolution","="))||Eg,z3=kt.toInt(kt.getValue(p,"CurrentRefreshRate","="))||z3,V3=kt.toInt(kt.getValue(p,"CurrentBitsPerPixel","="))||V3}return u}function s(o,u,l,p,c){let d=[],f="",m="",h="",g=0,y=0;if(l&&l.length){let S=l[0].split(M3.EOL);f=kt.getValue(S,"MonitorManufacturer","="),m=kt.getValue(S,"Name","="),h=kt.getValue(S,"PNPDeviceID","=").replace(/&amp;/g,"&").toLowerCase(),g=kt.toInt(kt.getValue(S,"ScreenWidth","=")),y=kt.toInt(kt.getValue(S,"ScreenHeight","="))}for(let S=0;S<o.length;S++)if(o[S].trim()!==""){o[S]="BitsPerPixel "+o[S],u[S]="Active "+u[S];let x=o[S].split(M3.EOL),w=u[S].split(M3.EOL),b=p[S].split(M3.EOL),C=kt.getValue(x,"BitsPerPixel"),O=kt.getValue(x,"Bounds").replace("{","").replace("}","").split(","),D=kt.getValue(x,"Primary"),M=kt.getValue(w,"MaxHorizontalImageSize"),P=kt.getValue(w,"MaxVerticalImageSize"),B=kt.getValue(w,"InstanceName").toLowerCase(),X=kt.getValue(b,"VideoOutputTechnology"),N="",A="";c.forEach(G=>{G.instanceId.toLowerCase().startsWith(B)&&f.startsWith("(")&&m.startsWith("PnP")&&(N=G.vendor,A=G.model)}),d.push({vendor:B.startsWith(h)&&N===""?f:N,model:B.startsWith(h)&&A===""?m:A,main:D.toLowerCase()==="true",builtin:X==="2147483648",connection:X&&rre[X]?rre[X]:"",resolutionx:kt.toInt(kt.getValue(O,"Width","=")),resolutiony:kt.toInt(kt.getValue(O,"Height","=")),sizex:M?parseInt(M,10):-1,sizey:P?parseInt(P,10):-1,pixeldepth:C,currentResX:kt.toInt(kt.getValue(O,"Width","=")),currentResY:kt.toInt(kt.getValue(O,"Height","=")),positionX:kt.toInt(kt.getValue(O,"X","=")),positionY:kt.toInt(kt.getValue(O,"Y","="))})}return o.length===0&&d.push({vendor:f,model:m,main:!0,resolutionx:g,resolutiony:y,sizex:-1,sizey:-1,pixeldepth:-1,currentResX:g,currentResY:y,positionX:0,positionY:0}),d}}
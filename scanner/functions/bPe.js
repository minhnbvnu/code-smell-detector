function bPe(e){function t(r){return{}.hasOwnProperty.call(Qte,r)?Qte[r]:r}return new Promise(r=>{process.nextTick(()=>{let i=[];if(($te||Wte||Gte||Xte)&&bg('export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL',function(a,n){if(!a){let s=n.toString().split("Memory Device");s.shift(),s.forEach(function(o){let u=o.split(`
`),l=Et.getValue(u,"Size"),p=l.indexOf("GB")>=0?parseInt(l,10)*1024*1024*1024:parseInt(l,10)*1024*1024;parseInt(Et.getValue(u,"Size"),10)>0?i.push({size:p,bank:Et.getValue(u,"Bank Locator"),type:Et.getValue(u,"Type:"),clockSpeed:Et.getValue(u,"Configured Clock Speed:")?parseInt(Et.getValue(u,"Configured Clock Speed:"),10):Et.getValue(u,"Speed:")?parseInt(Et.getValue(u,"Speed:"),10):-1,formFactor:Et.getValue(u,"Form Factor:"),manufacturer:Et.getValue(u,"Manufacturer:"),partNum:Et.getValue(u,"Part Number:"),serialNum:Et.getValue(u,"Serial Number:"),voltageConfigured:parseFloat(Et.getValue(u,"Configured Voltage:")||-1),voltageMin:parseFloat(Et.getValue(u,"Minimum Voltage:")||-1),voltageMax:parseFloat(Et.getValue(u,"Maximum Voltage:")||-1)}):i.push({size:0,bank:Et.getValue(u,"Bank Locator"),type:"Empty",clockSpeed:0,formFactor:Et.getValue(u,"Form Factor:"),partNum:"",serialNum:"",voltageConfigured:-1,voltageMin:-1,voltageMax:-1})})}if(!i.length){i.push({size:tu.totalmem(),bank:"",type:"",clockSpeed:0,formFactor:"",partNum:"",serialNum:"",voltageConfigured:-1,voltageMin:-1,voltageMax:-1});try{let s=nC("cat /proc/cpuinfo 2>/dev/null"),o=s.toString().split(`
`),u=Et.getValue(o,"hardware",":",!0).toUpperCase(),l=Et.getValue(o,"revision",":",!0).toLowerCase();if(u==="BCM2835"||u==="BCM2708"||u==="BCM2709"||u==="BCM2835"||u==="BCM2837"){let p={"0":400,"1":450,"2":450,"3":3200};i[0].clockSpeed=l&&l[2]&&p[l[2]]||400,i[0].clockSpeed=l&&l[4]&&l[4]==="d"?"500":i[0].clockSpeed,i[0].type="LPDDR2",i[0].type=l&&l[2]&&l[2]==="3"?"LPDDR4":i[0].type,i[0].formFactor="SoC",s=nC("vcgencmd get_config sdram_freq 2>/dev/null"),o=s.toString().split(`
`);let c=parseInt(Et.getValue(o,"sdram_freq","=",!0),10)||0;c&&(i.clockSpeed=c),s=nC("vcgencmd measure_volts sdram_p 2>/dev/null"),o=s.toString().split(`
`);let d=parseFloat(Et.getValue(o,"volt","=",!0))||0;d&&(i[0].voltageConfigured=d,i[0].voltageMin=d,i[0].voltageMax=d)}}catch{Et.noop()}}e&&e(i),r(i)}),Hte&&bg("system_profiler SPMemoryDataType",function(a,n){if(!a){let s=n.toString().split("        BANK "),o=!0;s.length===1&&(s=n.toString().split("        DIMM"),o=!1),s.shift(),s.forEach(function(u){let l=u.split(`
`),p=(o?"BANK ":"DIMM")+l[0].trim().split("/")[0],c=parseInt(Et.getValue(l,"          Size"));c?i.push({size:c*1024*1024*1024,bank:p,type:Et.getValue(l,"          Type:"),clockSpeed:parseInt(Et.getValue(l,"          Speed:"),10),formFactor:"",manufacturer:t(Et.getValue(l,"          Manufacturer:")),partNum:Et.getValue(l,"          Part Number:"),serialNum:Et.getValue(l,"          Serial Number:"),voltageConfigured:-1,voltageMin:-1,voltageMax:-1}):i.push({size:0,bank:p,type:"Empty",clockSpeed:0,formFactor:"",manufacturer:"",partNum:"",serialNum:"",voltageConfigured:-1,voltageMin:-1,voltageMax:-1})})}e&&e(i),r(i)}),Yte&&(e&&e(i),r(i)),Kte){let a="Unknown|Other|DRAM|Synchronous DRAM|Cache DRAM|EDO|EDRAM|VRAM|SRAM|RAM|ROM|FLASH|EEPROM|FEPROM|EPROM|CDRAM|3DRAM|SDRAM|SGRAM|RDRAM|DDR|DDR2|DDR2 FB-DIMM|Reserved|DDR3|FBD2|DDR4|LPDDR|LPDDR2|LPDDR3|LPDDR4".split("|"),n="Unknown|Other|SIP|DIP|ZIP|SOJ|Proprietary|SIMM|DIMM|TSOP|PGA|RIMM|SODIMM|SRIMM|SMD|SSMP|QFP|TQFP|SOIC|LCC|PLCC|BGA|FPBGA|LGA".split("|");try{Et.wmic("memorychip get /value").then((s,o)=>{if(!o){let u=s.toString().split("BankL");u.shift(),u.forEach(function(l){let p=l.split(`\r
`);i.push({size:parseInt(Et.getValue(p,"Capacity","="),10)||0,bank:Et.getValue(p,"abel","="),type:a[parseInt(Et.getValue(p,"MemoryType","="),10)],clockSpeed:parseInt(Et.getValue(p,"ConfiguredClockSpeed","="),10)||0,formFactor:n[parseInt(Et.getValue(p,"FormFactor","="),10)||0],manufacturer:Et.getValue(p,"Manufacturer","="),partNum:Et.getValue(p,"PartNumber","="),serialNum:Et.getValue(p,"SerialNumber","="),voltageConfigured:(parseInt(Et.getValue(p,"ConfiguredVoltage","="),10)||0)/1e3,voltageMin:(parseInt(Et.getValue(p,"MinVoltage","="),10)||0)/1e3,voltageMax:(parseInt(Et.getValue(p,"MaxVoltage","="),10)||0)/1e3})})}e&&e(i),r(i)})}catch{e&&e(i),r(i)}}})})}
function cw(e){var r={};var t=[];e.FileIndex.map(function(r,t){return[r,e.FullPaths[t]]}).forEach(function(e){var a=e[0],n=e[1];if(a.type!=2)return;if(!a.name.match(/\.iwa/))return;if(a.name.match(/OperationStorage/))return;Bg(zg(a.content)).forEach(function(e){t.push(e.id);r[e.id]={deps:[],location:n,type:Pg(e.messages[0].meta[1][0].data)}})});t.sort(function(e,r){return e-r});var a=t.filter(function(e){return e>1}).map(function(e){return[e,Ig(e)]});e.FileIndex.forEach(function(e){if(!e.name.match(/\.iwa/))return;if(e.name.match(/OperationStorage/))return;Bg(zg(e.content)).forEach(function(e){a.forEach(function(t){if(e.messages.some(function(e){return Pg(e.meta[1][0].data)!=11006&&Ag(e.data,t[1])})){r[t[0]].deps.push(e.id)}})})});return r}
function vre(e,t,r){let i=["00:00:00:00:00:00","00:03:FF","00:05:69","00:0C:29","00:0F:4B","00:0F:4B","00:13:07","00:13:BE","00:15:5d","00:16:3E","00:1C:42","00:21:F6","00:21:F6","00:24:0B","00:24:0B","00:50:56","00:A0:B1","00:E0:C8","08:00:27","0A:00:27","18:92:2C","16:DF:49","3C:F3:92","54:52:00","FC:15:97"];return r?i.filter(a=>r.toUpperCase().toUpperCase().startsWith(a.substr(0,r.length))).length>0||e.toLowerCase().indexOf(" virtual ")>-1||t.toLowerCase().indexOf(" virtual ")>-1||e.toLowerCase().indexOf("vethernet ")>-1||t.toLowerCase().indexOf("vethernet ")>-1||e.toLowerCase().startsWith("veth")||t.toLowerCase().startsWith("veth")||e.toLowerCase().startsWith("vboxnet")||t.toLowerCase().startsWith("vboxnet"):!1}
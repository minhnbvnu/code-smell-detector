function eoe(e,t){let r=!0;function i(){r&&e._socket.resume()}e.readyState===e.CONNECTING?e.once("open",function(){e._receiver.removeAllListeners("drain"),e._receiver.on("drain",i)}):(e._receiver.removeAllListeners("drain"),e._receiver.on("drain",i));let a=new Jse(tr(Be({},t),{autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1}));return e.on("message",function(s){a.push(s)||(r=!1,e._socket.pause())}),e.once("error",function(s){a.destroyed||a.destroy(s)}),e.once("close",function(){a.destroyed||a.push(null)}),a._destroy=function(n,s){if(e.readyState===e.CLOSED){s(n),process.nextTick(Ck,a);return}let o=!1;e.once("error",function(l){o=!0,s(l)}),e.once("close",function(){o||s(n),process.nextTick(Ck,a)}),e.terminate()},a._final=function(n){if(e.readyState===e.CONNECTING){e.once("open",function(){a._final(n)});return}e._socket!==null&&(e._socket._writableState.finished?(n(),a._readableState.endEmitted&&a.destroy()):(e._socket.once("finish",function(){n()}),e.close()))},a._read=function(){e.readyState===e.OPEN&&!r&&(r=!0,e._receiver._writableState.needDrain||e._socket.resume())},a._write=function(n,s,o){if(e.readyState===e.CONNECTING){e.once("open",function(){a._write(n,s,o)});return}e.send(n,o)},a.on("end",Zse),a.on("error",Dk),a}
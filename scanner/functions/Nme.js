function Nme(e){var t=e._opts.logger;if(t===!1)e.logger={log:Ix,warn:Ix,error:Ix};else{if(t===void 0&&(t=console),!(typeof t=="object"&&t.log&&t.warn&&t.error))throw new Error("logger must implement log, warn and error methods");e.logger=t}}
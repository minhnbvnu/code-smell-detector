function connectionErrorHandler(e){var t=this;t.res?t.res.request?t.res.request.emit("error",e):t.res.emit("error",e):t._httpMessage.emit("error",e)}
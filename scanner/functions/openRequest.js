function openRequest(e,t,r){var n=r.httpStack.createRequest(e,t);n.setHeader("Tus-Resumable","1.0.0");var i=r.headers||{};for(var o in i)n.setHeader(o,i[o]);if(r.addRequestId){var s=(0,_uuid.default)();n.setHeader("X-Request-ID",s)}return n}
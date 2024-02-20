function __xhr(details) {
            // if details didn't include url, do nothing
            if (!details.url) return;
            // create unique id for the xhr
            const xhrId = Math.random().toString(36).substring(1, 9);
            // strip out functions from details, kind of hacky
            const detailsParsed = JSON.parse(JSON.stringify(details));
            // check which functions are included in the original details object
            // add a bool to indicate if event listeners should be attached
            if (details.onabort) detailsParsed.onabort = true;
            if (details.onerror) detailsParsed.onerror = true;
            if (details.onload) detailsParsed.onload = true;
            if (details.onloadend) detailsParsed.onloadend = true;
            if (details.onloadstart) detailsParsed.onloadstart = true;
            if (details.onprogress) detailsParsed.onprogress = true;
            if (details.onreadystatechange) detailsParsed.onreadystatechange = true;
            if (details.ontimeout) detailsParsed.ontimeout = true;
            // abort function gets returned when this function is called
            const abort = () => {
                window.postMessage({ id: _uuid, name: "API_XHR_ABORT_INJ_FROM_CREATE", xhrId: xhrId });
            };
            const callback = e => {
                const name = e.data.name;
                const response = e.data.response;
                // ensure callback is responding to the proper message
                if (
                    e.data.id !== _uuid
                    || e.data.xhrId !== xhrId
                    || !name
                    || !name.startsWith("RESP_API_XHR_TO_CREATE")
                ) return;
                console.log("XHR==response=", response);
                if (name === "RESP_API_XHR_TO_CREATE") {
                    console.log("RESP_API_XHR_TO_CREATE----");
                    // ignore
                } else if (name.includes("ABORT") && details.onabort) {
                    details.onabort(response);
                } else if (name.includes("ERROR") && details.onerror) {
                    details.onerror(response);
                } else if (name === "RESP_API_XHR_TO_CREATE_LOAD" && details.onload) {
                    details.onload(response);
                } else if (name.includes("LOADEND") && details.onloadend) {
                    details.onloadend(response);
                    // remove event listener when xhr is complete
                    window.removeEventListener("message", callback);
                } else if (name.includes("LOADSTART") && details.onloadstart) {
                    details.onloadtstart(response);
                } else if (name.includes("PROGRESS") && details.onprogress) {
                    details.onprogress(response);
                } else if (name.includes("READYSTATECHANGE") && details.onreadystatechange) {
                    details.onreadystatechange(response);
                } else if (name.includes("TIMEOUT") && details.ontimeout) {
                    details.ontimeout(response);
                }
            };
            window.addEventListener("message", callback);
            window.postMessage({ id: _uuid, name: "API_XHR_FROM_CREATE", details: JSON.stringify(detailsParsed), xhrId: xhrId });
            return { abort: abort };
        }
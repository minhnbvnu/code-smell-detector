function injectScript(frame) {
        let doc = frame.contentDocument || frame.contentWindow.document;
        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.innerHTML = `${sooFetch.toString()};`;
        doc.body.append(script);
    }
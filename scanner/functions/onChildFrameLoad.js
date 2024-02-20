function onChildFrameLoad() {
        console.log('payload.js: onChildFrameLoad');
        let doc = document.getElementById('childFrame').contentDocument || document.getElementById('childFrame').contentWindow.document;
        let content = doc.body.innerText;

        if (content.indexOf("Singularity of Origin") !== 0) { 
            injectScript( document.getElementById('childFrame'));
            let p = sooFetch(url, {
                credentials: 'omit',
            });
            run(p);
        }
    }
function GM_addStyleSync(css) {
            window.postMessage({ id: _uuid, name: "API_ADD_STYLE_SYNC", css: css });
            return css;
        }
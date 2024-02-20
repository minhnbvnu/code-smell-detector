function setViewportWidthProperty(value) {
            var viewport = document.querySelector("meta[name=viewport]"),
                content = viewport.content,
                props = content.split(','),
                newProps = [],
                prop,
                wStr = 'width',
                i = 0, len = props.length;
            for (; i < len; i++) {
                prop = props[i].trim().split('=');
                if (prop[0] == wStr) {
                    newProps.push(wStr + '=' + value);
                } else {
                    newProps.push(prop[0] + '=' + prop[1]);
                }
            }
            content = newProps.join(', ');
            if (content.indexOf(wStr + '=') == -1) {
                content = wStr + '=' + value + ', ' + content;
            }
            viewport.content = content;
        }
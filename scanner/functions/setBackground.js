function setBackground(obj) {
        if (obj) {
            var styles = [];
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    styles.push(name + ":" + obj[name] + '; ');
                }
            }
            utils.cssRule(cssRuleId, styles.length ? ('body{' + styles.join("") + '}') : '', me.document);
        } else {
            utils.cssRule(cssRuleId, '', me.document)
        }
    }
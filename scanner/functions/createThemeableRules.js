function createThemeableRules(key, img, setSvgProps, styles) {
    // find or create stylesheet as needed
    var styleEl = document.querySelector('style#injected-stylesheet-themeables');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'injected-stylesheet-themeables';
        document.head.appendChild(styleEl);
    }
    var sheet = styleEl.sheet;

    return (styles.length ? styles : ['background-image']).reduce(function(rules, styleName) {
        var selectorText = '.hypergrid-' + styleName + '-' + key;

        // find and delete existing rule, if any
        var ruleIndex = Array.prototype.findIndex.call(sheet.cssRules, function(rule) {
            return rule.selectorText === selectorText;
        });
        if (ruleIndex !== -1) {
            sheet.deleteRule(ruleIndex);
        }

        // create and insert new rule consisting of selector + style "collection"
        var ruleStyles = {};

        // add image data style
        ruleStyles[styleName] = 'url(' + img.src + ')';

        // add dimensions if known
        if (img.width) { ruleStyles.width = img.width + 'px'; }
        if (img.height) { ruleStyles.height = img.height + 'px'; }

        // combine the above styles into a semi-colon-separated "collection"
        var styleCollection = Object.keys(ruleStyles).map(function(key) {
            return key + ':' + ruleStyles[key];
        }).join(';');

        var ruleText = '{' + styleCollection + '}';
        sheet.insertRule(selectorText + ruleText);

        var themeableRule = {
            rule: sheet.cssRules[0]
        };
        if (setSvgProps) {
            themeableRule.setSvgProps = setSvgProps;
        }
        rules.push(themeableRule);
        return rules;
    }, []);
}
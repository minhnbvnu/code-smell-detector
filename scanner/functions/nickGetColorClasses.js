function nickGetColorClasses(nickMsg, propName) {
        var colorClasses = [
            'cwf-default'
        ];
        if (propName in nickMsg && nickMsg[propName] && nickMsg[propName].length > 0) {
            var color = nickMsg[propName];
            if (color.match(/^weechat/)) {
                // color option
                var colorName = color.match(/[a-zA-Z0-9_]+$/)[0];
                colorClasses = [
                    'cof-' + colorName,
                    'cob-' + colorName,
                    'coa-' + colorName
                ];
            } else {
                if (color.match(/^[a-zA-Z]+(:|$)/)) {
                    // WeeChat color name (foreground)
                    var cwfcolor = color.match(/^[a-zA-Z]+/)[0];
                    colorClasses = [
                        'cwf-' + cwfcolor
                    ];
                } else if (color.match(/^[0-9]+(:|$)/)) {
                    // extended color (foreground)
                    var cefcolor = color.match(/^[0-9]+/)[0];
                    colorClasses = [
                        'cef-' + cefcolor
                    ];
                }
                if (color.match(/:[a-zA-Z]+$/)) {
                    // WeeChat color name (background)
                    var cwbcolor = color.match(/:[a-zA-Z]+$/)[0].substring(1);
                    colorClasses.push('cwb-' + cwbcolor);
                } else if (color.match(/:[0-9]+$/)) {
                    // extended color (background)
                    var cebcolor = color.match(/:[0-9]+$/)[0].substring(1);
                    colorClasses.push('ceb-' + cebcolor);
                }
            }
        }
        return colorClasses;
    }
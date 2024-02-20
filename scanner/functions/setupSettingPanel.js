function setupSettingPanel(settingDiv, settingOpener, editor) {
    var BOOL = null;

    var desc = {
        mode:            "Mode:",
        wrap:            "Soft Wrap:",
        theme:           "Theme:",
        fontSize:        "Font Size:",
        showGutter:      "Display Gutter:",
        keybindings:     "Keyboard",
        showPrintMargin: "Show Print Margin:",
        useSoftTabs:     "Use Soft Tabs:",
        showInvisibles:  "Show Invisibles"
    };

    var optionValues = {
        mode: {
            text:       "Plain",
            javascript: "JavaScript",
            xml:        "XML",
            html:       "HTML",
            css:        "CSS",
            scss:       "SCSS",
            python:     "Python",
            php:        "PHP",
            java:       "Java",
            ruby:       "Ruby",
            c_cpp:      "C/C++",
            coffee:     "CoffeeScript",
            json:       "json",
            perl:       "Perl",
            clojure:    "Clojure",
            ocaml:      "OCaml",
            csharp:     "C#",
            haxe:       "haXe",
            svg:        "SVG",
            textile:    "Textile",
            groovy:     "Groovy",
            liquid:     "Liquid",
            Scala:      "Scala"
        },
        theme: {
            clouds:           "Clouds",
            clouds_midnight:  "Clouds Midnight",
            cobalt:           "Cobalt",
            crimson_editor:   "Crimson Editor",
            dawn:             "Dawn",
            gob:              "Green on Black",
            eclipse:          "Eclipse",
            idle_fingers:     "Idle Fingers",
            kr_theme:         "Kr Theme",
            merbivore:        "Merbivore",
            merbivore_soft:   "Merbivore Soft",
            mono_industrial:  "Mono Industrial",
            monokai:          "Monokai",
            pastel_on_dark:   "Pastel On Dark",
            solarized_dark:   "Solarized Dark",
            solarized_light:  "Solarized Light",
            textmate:         "Textmate",
            twilight:         "Twilight",
            vibrant_ink:      "Vibrant Ink"
        },
        showGutter: BOOL,
        fontSize: {
            "10px": "10px",
            "11px": "11px",
            "12px": "12px",
            "14px": "14px",
            "16px": "16px"
        },
        wrap: {
            off:    "Off",
            40:     "40",
            80:     "80",
            free:   "Free"
        },
        keybindings: {
            ace: "ace",
            vim: "vim",
            emacs: "emacs"
        },
        showPrintMargin:    BOOL,
        useSoftTabs:        BOOL,
        showInvisibles:     BOOL
    };

    var table = [];
    table.push("<table><tr><th>Setting</th><th>Value</th></tr>");

    function renderOption(builder, option, obj, cValue) {
        if (!obj) {
            builder.push(
                "<input type='checkbox' title='", option, "' ",
                    cValue + "" == "true" ? "checked='true'" : "",
               "'></input>"
            );
            return;
        }
        builder.push("<select title='" + option + "'>");
        for (var value in obj) {
            builder.push("<option value='" + value + "' ");

            if (cValue == value) {
                builder.push(" selected ");
            }

            builder.push(">",
                obj[value],
                "</option>");
        }
        builder.push("</select>");
    }

    for (var option in exports.defaultOptions) {
        table.push("<tr><td>", desc[option], "</td>");
        table.push("<td>");
        renderOption(table, option, optionValues[option], editor.getOption(option));
        table.push("</td></tr>");
    }
    table.push("</table>");
    settingDiv.innerHTML = table.join("");

    var onChange = function(e) {
        var select = e.currentTarget;
        editor.setOption(select.title, select.value);
    };
    var onClick = function(e) {
        var cb = e.currentTarget;
        editor.setOption(cb.title, cb.checked);
    };
    var selects = settingDiv.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++)
        selects[i].onchange = onChange;
    var cbs = settingDiv.getElementsByTagName("input");
    for (var i = 0; i < cbs.length; i++)
        cbs[i].onclick = onClick;


    var button = document.createElement("input");
    button.type = "button";
    button.value = "Hide";
    event.addListener(button, "click", function() {
        editor.setDisplaySettings(false);
    });
    settingDiv.appendChild(button);
    settingDiv.hideButton = button;
}
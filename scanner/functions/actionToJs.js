function actionToJs(action, identifiers, defined, scope) {
    var declares = [], usedVars = {};
    forEach(identifiers, function (i) {
        if (action.indexOf(i) !== -1) {
            usedVars[i] = true;
            declares.push("var " + i + "= facts." + i + ";");
        }
    });
    extd(defined).keys().forEach(function (i) {
        if (action.indexOf(i) !== -1 && !usedVars[i]) {
            usedVars[i] = true;
            declares.push("var " + i + "= defined." + i + ";");
        }
    });

    extd(scope).keys().forEach(function (i) {
        if (action.indexOf(i) !== -1 && !usedVars[i]) {
            usedVars[i] = true;
            declares.push("var " + i + "= scope." + i + ";");
        }
    });
    extd(modifiers).forEach(function (i) {
        if (action.indexOf(i) !== -1 && !usedVars[i]) {
            declares.push("var " + i + "= flow." + i + ";");
        }
    });
    var params = ["facts", 'flow'];
    if (/next\(.*\)/.test(action)) {
        params.push("next");
    }
    action = declares.join("") + action;
    try {
        return ["function(", params.join(","), "){", action, "}"].join("");
    } catch (e) {
        throw new Error("Invalid action : " + action + "\n" + e.message);
    }
}
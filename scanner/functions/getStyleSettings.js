function getStyleSettings(comment, styleSettings) {
        var styleRegEx = /^(\/\/\/\s*<style\s+)(([a-zA-Z])+=('|").+('|"))\s*\/>/igm;
        var settings = styleRegEx.exec(comment);
        if(settings) {
            var settingsRegEx = /^([a-zA-Z]+=['"]on['|"])/igm;
            settings = settingsRegEx.exec(settings[2]);
            if(settings) {
                for(var i = 0; i < settings.length; i++) {
                    var setting = (settings[i]).split("=");
                    var on = "\"on\"";
                    switch(setting[0]) {
                        case "blockInCompoundStmt": {
                            styleSettings.blockInCompoundStmt = setting[1] == on;
                            break;

                        }
                        case "eqeqeq": {
                            styleSettings.eqeqeq = setting[1] == on;
                            break;

                        }
                        case "forin": {
                            styleSettings.forin = setting[1] == on;
                            break;

                        }
                        case "emptyBlocks": {
                            styleSettings.emptyBlocks = setting[1] == on;
                            break;

                        }
                        case "newMustBeUsed": {
                            styleSettings.newMustBeUsed = setting[1] == on;
                            break;

                        }
                        case "requireSemi": {
                            styleSettings.requireSemi = setting[1] == on;
                            break;

                        }
                        case "assignmentInCond": {
                            styleSettings.assignmentInCond = setting[1] == on;
                            break;

                        }
                        case "eqnull": {
                            styleSettings.eqnull = setting[1] == on;
                            break;

                        }
                        case "evalOK": {
                            styleSettings.evalOK = setting[1] == on;
                            break;

                        }
                        case "innerScopeDeclEscape": {
                            styleSettings.innerScopeDeclEscape = setting[1] == on;
                            break;

                        }
                        case "funcInLoop": {
                            styleSettings.funcInLoop = setting[1] == on;
                            break;

                        }
                        case "reDeclareLocal": {
                            styleSettings.reDeclareLocal = setting[1] == on;
                            break;

                        }
                        case "literalSubscript": {
                            styleSettings.literalSubscript = setting[1] == on;
                            break;

                        }
                        case "implicitAny": {
                            styleSettings.implicitAny = setting[1] == on;
                            break;

                        }
                    }
                }
            }
        }
    }
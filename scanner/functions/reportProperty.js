function reportProperty(name, display, msg){
            if (properties[name]){
                if (typeof propertiesToCheck[name] !== "string" || properties[name].value.toLowerCase() !== propertiesToCheck[name]){
                    reporter.report(msg || name + " can't be used with display: " + display + ".", properties[name].line, properties[name].col, rule);
                }
            }
        }
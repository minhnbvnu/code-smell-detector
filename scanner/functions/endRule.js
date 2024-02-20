function endRule(){
            var prop,
                i,
                len,
                needed,
                actual,
                needsStandard = [];

            for (prop in properties){
                if (propertiesToCheck[prop]){
                    needsStandard.push({ actual: prop, needed: propertiesToCheck[prop]});
                }
            }

            for (i=0, len=needsStandard.length; i < len; i++){
                needed = needsStandard[i].needed;
                actual = needsStandard[i].actual;

                if (!properties[needed]){
                    reporter.report("Missing standard property '" + needed + "' to go along with '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
                } else {
                    if (properties[needed][0].pos < properties[actual][0].pos){
                        reporter.report("Standard property '" + needed + "' should come after vendor-prefixed property '" + actual + "'.", properties[actual][0].name.line, properties[actual][0].name.col, rule);
                    }
                }
            }

        }
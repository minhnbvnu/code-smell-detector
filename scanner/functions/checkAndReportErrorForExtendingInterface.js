function checkAndReportErrorForExtendingInterface(errorLocation) {
                const expression = getEntityNameForExtendingInterface(errorLocation);
                if (expression && resolveEntityName(expression, 64 /* Interface */, 
                /*ignoreErrors*/
                true)) {
                    error(errorLocation, Diagnostics.Cannot_extend_an_interface_0_Did_you_mean_implements, getTextOfNode(expression));
                    return true;
                }
                return false;
            }
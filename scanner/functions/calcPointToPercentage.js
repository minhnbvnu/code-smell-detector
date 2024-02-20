function calcPointToPercentage(calcPoint) {
                var location = calcPoint - offset(scope_Base, options.ort);
                var proposal = (location * 100) / baseSize();
                // Clamp proposal between 0% and 100%
                // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
                // are used (e.g. contained handles feature)
                proposal = limit(proposal);
                return options.dir ? 100 - proposal : proposal;
            }
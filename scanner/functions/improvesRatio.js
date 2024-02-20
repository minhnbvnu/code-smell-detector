function improvesRatio(currentrow, nextnode, length) {
            var newrow; 

            if (currentrow.length === 0) {
                return true;
            }
            
            newrow = currentrow.slice();
            newrow.push(nextnode);
            
            var currentratio = calculateRatio(currentrow, length);
            var newratio = calculateRatio(newrow, length);
            
            // the pseudocode in the Bruls paper has the direction of the comparison
            // wrong, this is the correct one.
            return currentratio >= newratio; 
        }
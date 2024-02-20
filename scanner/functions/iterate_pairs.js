function iterate_pairs(array, callback, ...args) {
    let any_remove = false;
    for (let a = 0; a < array.length; ++a) {
        for (let b = a + 1; b < array.length; ++b) {
            let result = callback(array[a], array[b], ...args);

            if (result && result !== iterate.CONTINUE &&
                !(Array.isArray(result) &&
                  result[0] === iterate.CONTINUE &&
                  result[1] === iterate.CONTINUE)) {
                    
                // Expand single cases
                if (! Array.isArray(result)) { result = [result, result]; }

                // Process:
                switch (result[1]) {
                case iterate.REMOVE:
                    remove_key(array, b);
                    any_remove = true;
                    --b;
                    break;
                    
                case iterate.REMOVE_AND_BREAK:
                    remove_key(array, b);
                    any_remove = true;
                    // Fall through
                    
                case iterate.BREAK:
                    b = array.length;
                    break;
                } // switch result_b

                
                switch (result[0]) {
                case iterate.REMOVE:
                    any_remove = true;
                    remove_key(array, a);
                    --a;

                    // Stop the inner loop because A is gone, but continue
                    // iteration.
                    b = array.length;
                    break;
                    
                case iterate.REMOVE_AND_BREAK:
                    remove_key(array, a);
                    any_remove = true;

                    // Indices don't matter because we're breaking out of iteration
                    
                    // Fall through
                    
                case iterate.BREAK:
                    // Stop all iteration
                    return any_remove;
                } // switch result_a
            }
        } // b
    } // a

    return any_remove;
}
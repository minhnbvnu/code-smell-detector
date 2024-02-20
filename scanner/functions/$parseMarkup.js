function $parseMarkup(str, stateChanges) {
    // First instance.
    
    // Remove single newlines, temporarily protecting paragraph breaks.
    str = str.replace(/ *\n{2,}/g, '¶');
    str = str.replace(/ *\n/g, ' ');
    str = str.replace(/¶/g, '\n\n');

    // Convert {br} to a newline
    str = str.replace(/\{br\}/g, '\n');

    str = $parseMarkupHelper(str, 0, stateChanges);

    // Efficiently remove degenerate state changes and compact
    {
        let src, dst;
        for (src = 0, dst = 0; src < stateChanges.length - 1; ++src) {
            if (src !== dst) { stateChanges[dst] = stateChanges[src]; }
            
            // Do not overwrite if this and the next element differ
            if (stateChanges[src].startIndex !== stateChanges[src + 1].startIndex) { ++dst; }
        }

        // Remove the remaining elements
        stateChanges.splice(dst, src - dst);
    }
    
    // Update the end indices (which are inclusive)
    for (let i = 0; i < stateChanges.length - 1; ++i) {
        stateChanges[i].endIndex = stateChanges[i + 1].startIndex - 1;
        // Width of this section, to be computed later
        stateChanges[i].width = 0;
    }
    // Force the last element to end at the string end
    stateChanges[stateChanges.length - 1].endIndex = str.length - 1;
    stateChanges[stateChanges.length - 1].width = 0;
    
    return str;
}
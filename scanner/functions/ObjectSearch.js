function ObjectSearch(text, object, reverse, caseSensitiveCookieName)
{
    this.text = text;
    this.reverse = reverse;
    this.caseSensitiveCookieName = caseSensitiveCookieName;

    // Helper stack as an alternative for recursive tree iteration.
    this.stack = [];

    // The search can't use recursive approach to iterate the tree of objects.
    // Instad we have a helper persistent stack that holds the current position
    // in the tree. This way the user can see individual matches step by step.
    //
    // object: current object in the tree.
    // propIndex: index of the last found property with matched value.
    // startOffset: index of the match within the value (there can be more matches in it)
    this.stack.push({
        object: object,
        propIndex: 0,
        startOffset: -1
    });

    // Array of matched values.
    this.matches = [];
}
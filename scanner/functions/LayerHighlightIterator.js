constructor(languageLayer, treeCursor) {
    this.languageLayer = languageLayer;
    this.depth = this.languageLayer.depth;

    // The iterator is always positioned at either the start or the end of some node
    // in the syntax tree.
    this.atEnd = false;
    this.treeCursor = treeCursor;
    this.offset = 0;

    // In order to determine which selectors match its current node, the iterator maintains
    // a list of the current node's ancestors. Because the selectors can use the `:nth-child`
    // pseudo-class, each node's child index is also stored.
    this.containingNodeTypes = [];
    this.containingNodeChildIndices = [];
    this.containingNodeEndIndices = [];

    // At any given position, the iterator exposes the list of class names that should be
    // *ended* at its current position and the list of class names that should be *started*
    // at its current position.
    this.closeTags = [];
    this.openTags = [];
  }
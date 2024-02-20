function subdivideNode(context, layer, node, cullingTest) {
    if (node.additiveRefinement) {
        // Additive refinement can only fetch visible children.
        _subdivideNodeAdditive(context, layer, node, cullingTest);
    } else {
        // Substractive refinement on the other hand requires to replace
        // node with all of its children
        _subdivideNodeSubstractive(context, layer, node);
    }
}
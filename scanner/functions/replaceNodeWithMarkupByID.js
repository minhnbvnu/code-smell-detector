function replaceNodeWithMarkupByID(reactId, markup) {
    // reactId here is the reactId of the old node
    // By the time we are here, the oldNode is already unmounted and hence gone from ReactWWOps
    // ASSUMPTION: The nextNode has the same reactId as the old node

    const nextNode = markup.getPublicInstance();
    nextNode.replaceAt(reactId);

}
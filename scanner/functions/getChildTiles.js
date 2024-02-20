function getChildTiles(tile) {
    // only keep children that have the same layer and a valid tileId
    return tile.children.filter(n => n.layer == tile.layer && n.tileId);
}
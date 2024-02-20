async function parseImplicitTiles(subtree, options, parentData = {
    mortonIndex: 0,
    x: 0,
    y: 0,
    z: 0
  }, childIndex = 0, level = 0, globalData = {
    level: 0,
    mortonIndex: 0,
    x: 0,
    y: 0,
    z: 0
  }) {
    const {
      subdivisionScheme,
      subtreeLevels,
      maximumLevel,
      contentUrlTemplate,
      subtreesUriTemplate,
      basePath
    } = options;
    const tile = { children: [], lodMetricValue: 0, contentUrl: "" };
    const childrenPerTile = SUBDIVISION_COUNT_MAP[subdivisionScheme];
    const childX = childIndex & 1;
    const childY = childIndex >> 1 & 1;
    const childZ = childIndex >> 2 & 1;
    const levelOffset = (childrenPerTile ** level - 1) / (childrenPerTile - 1);
    let childTileMortonIndex = concatBits(parentData.mortonIndex, childIndex);
    let tileAvailabilityIndex = levelOffset + childTileMortonIndex;
    let childTileX = concatBits(parentData.x, childX);
    let childTileY = concatBits(parentData.y, childY);
    let childTileZ = concatBits(parentData.z, childZ);
    let isChildSubtreeAvailable = false;
    if (level + 1 > subtreeLevels) {
      isChildSubtreeAvailable = getAvailabilityResult(subtree.childSubtreeAvailability, childTileMortonIndex);
    }
    const x = concatBits(globalData.x, childTileX);
    const y = concatBits(globalData.y, childTileY);
    const z = concatBits(globalData.z, childTileZ);
    const lev = level + globalData.level;
    if (isChildSubtreeAvailable) {
      const subtreePath = `${basePath}/${subtreesUriTemplate}`;
      const childSubtreeUrl = replaceContentUrlTemplate(subtreePath, lev, x, y, z);
      const childSubtree = await load(childSubtreeUrl, Tile3DSubtreeLoader);
      subtree = childSubtree;
      globalData.mortonIndex = childTileMortonIndex;
      globalData.x = childTileX;
      globalData.y = childTileY;
      globalData.z = childTileZ;
      globalData.level = level;
      childTileMortonIndex = 0;
      tileAvailabilityIndex = 0;
      childTileX = 0;
      childTileY = 0;
      childTileZ = 0;
      level = 0;
    }
    const isTileAvailable = getAvailabilityResult(subtree.tileAvailability, tileAvailabilityIndex);
    if (!isTileAvailable || level > maximumLevel) {
      return tile;
    }
    const isContentAvailable = getAvailabilityResult(subtree.contentAvailability, tileAvailabilityIndex);
    if (isContentAvailable) {
      tile.contentUrl = replaceContentUrlTemplate(contentUrlTemplate, lev, x, y, z);
    }
    const childTileLevel = level + 1;
    const pData = { mortonIndex: childTileMortonIndex, x: childTileX, y: childTileY, z: childTileZ };
    for (let index = 0; index < childrenPerTile; index++) {
      const currentTile = await parseImplicitTiles(subtree, options, pData, index, childTileLevel, globalData);
      if (currentTile.contentUrl || currentTile.children.length) {
        const globalLevel = lev + 1;
        const childCoordinates = { childTileX, childTileY, childTileZ };
        const formattedTile = formatTileData(currentTile, globalLevel, childCoordinates, options);
        tile.children.push(formattedTile);
      }
    }
    return tile;
  }
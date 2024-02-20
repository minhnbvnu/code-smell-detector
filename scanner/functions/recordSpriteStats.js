function recordSpriteStats(spritesheet) {
    if (spritesheet.$name[0] === '$') { return; }
    const data = (spritesheet.$uint16Data || spritesheet.$data);
    let count = data.width * data.height;
    
    if (spritesheet.$type === 'font') {
        // Fonts count half as much because they are 8-bit
        count = Math.ceil(count / 2) >>> 0;
    }
    resourceStats.spritePixels += count;
    resourceStats.spritePixelsByURL[spritesheet.$url] = count;
    
    ++resourceStats.spritesheets;
    resourceStats.maxSpritesheetWidth = Math.max(resourceStats.maxSpritesheetWidth, data.width);
    resourceStats.maxSpritesheetHeight = Math.max(resourceStats.maxSpritesheetHeight, data.height);
}
function loadPlaceholderCallback(reason, url) {
        const size = url.endsWith('label64.png') ? {x: 64, y: 64} :
              url.endsWith('label128.png') ? {x: 128, y: 128} :
              {x: 1152, y: 1120}; // preview.png

        // Create empty image and flipped image 
        const data = new UInt16Array(size.x * size.y);
        data.width = size.x;
        data.height = size.y;
        
        spritesheetLoadCallback([data, data], null, url);
        
        return true;
    }
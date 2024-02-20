function addAssetAsNode(asset, namePrefix) {
      seenNodes[asset.id] = true;
      dotSrc += `  ${asset.id} [fontsize=12, style = ${
        asset.isLoaded ? 'solid' : 'dashed'
      }, label = "${namePrefix || ''}${(asset.url
        ? Path.basename(asset.url)
        : `i:${asset}`
      ).replace(/"/g, '\\"')}"];\n`;
    }
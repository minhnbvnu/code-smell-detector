function drawBlock({width, height, top, left, zIndex = 999, background = agrs.background, radius, subClas} = {}) {
    const styles = ['height:' + height + '%'];

    if (!subClas) {
      styles.push('top:' + top + '%', 'left:' + left + '%', 'width:' + width + '%');
    }

    if (classProps.zIndex !== zIndex) {
      styles.push('z-index:' + zIndex);
    }

    if (classProps.background !== background) {
      styles.push('background:' + background);
    }

    radius && radius != '0px' && styles.push('border-radius:' + radius);
    blocks.push(`<div class="_${subClas ? ' __' : ''}" style="${styles.join(';')}"></div>`);
  }
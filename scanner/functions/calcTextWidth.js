function calcTextWidth(text, {fontSize, fontWeight} = {}) {
    if (!text) return 0;

    const div = document.createElement('div');
    div.innerHTML = text;
    div.style.cssText = [
      'position:absolute',
      'left:-99999px',
	    `height:${fontSize}`,
      `font-size:${fontSize}`,
      `font-weight:${fontWeight}`,
      'opacity:0'
    ].join(';');
    document.body.appendChild(div);
    const w = getStyle(div, 'width');
    const h = getStyle(div, 'height');
    document.body.removeChild(div);
    return {
      w: parseInt(w),
      h: parseInt(h)
    };
  }
function $svg(tag, props = {}, children = []) {
    const el = document.createElementNS(svgns, tag);
    Object.keys(props).forEach( prop => el.setAttribute( prop, props[prop] ) );
    children.forEach( child => el.appendChild( child ) );
    return el;
  }
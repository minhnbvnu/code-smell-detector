function createCommonClass(props) {
    const inlineStyle = ['<style>._{'];
    for(let prop in props) {
      inlineStyle.push(`${prop === 'zIndex'? 'z-index': prop}:${props[prop]};`);
    }
    inlineStyle.push('}.__{top:0%;left:0%;width:100%;}</style>');
    blocks.push(inlineStyle.join(''));
  }
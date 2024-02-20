function addInertStyle(node) {
    if (node.querySelector('style#inert-style, link#inert-style')) {
      return;
    }
    const style = document.createElement('style');
    style.setAttribute('id', 'inert-style');
    style.textContent = '\n'+
                        '[inert] {\n' +
                        '  pointer-events: none;\n' +
                        '  cursor: default;\n' +
                        '}\n' +
                        '\n' +
                        '[inert], [inert] * {\n' +
                        '  -webkit-user-select: none;\n' +
                        '  -moz-user-select: none;\n' +
                        '  -ms-user-select: none;\n' +
                        '  user-select: none;\n' +
                        '}\n';
    node.appendChild(style);
  }
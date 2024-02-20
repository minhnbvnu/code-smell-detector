function mounted(element) {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = ReactDOM.render(element, container);
    return element;
  }
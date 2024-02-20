function wrapTemplate(type, template) {
      type = lowercase(type || 'html');
      switch (type) {
      case 'svg':
      case 'math':
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<' + type + '>' + template + '</' + type + '>';
        return wrapper.childNodes[0].childNodes;
      default:
        return template;
      }
    }
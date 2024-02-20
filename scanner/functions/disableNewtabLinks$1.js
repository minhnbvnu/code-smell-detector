function disableNewtabLinks$1(source) {
      document.addEventListener('click', function (ev) {
        var target = ev.target;
        while (target !== null) {
          if (target.localName === 'a' && target.hasAttribute('target')) {
            ev.stopPropagation();
            ev.preventDefault();
            hit(source);
            break;
          }
          target = target.parentNode;
        }
      });
    }
function findContainers(id) {
      // support duplicate ids on the page
      return selectChildren('.ai2html-responsive', document).filter(function(el) {
        if (el.getAttribute('id') != id) return false;
        if (el.classList.contains('ai2html-resizer')) return false;
        el.classList.add('ai2html-resizer');
        return true;
      });
    }
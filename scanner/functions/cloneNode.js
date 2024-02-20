function cloneNode(el) {
      var clone = el.cloneNode(true);
      element.appendChild(clone);

      // tag these slides as clones (to remove them on kill)
      clone.setAttribute('data-cloned', true);

      // Remove id from element
      clone.removeAttribute('id');
    }
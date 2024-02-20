function isDOMNode(obj) {
    var success = false;

    try {
      obj.appendChild(div);
      success = div.parentNode == obj;
    } catch (e) {
      return false;
    } finally {
      try {
        obj.removeChild(div);
      } catch (e) {
        // Remove failed, not much we can do about that
      }
    }

    return success;
  }
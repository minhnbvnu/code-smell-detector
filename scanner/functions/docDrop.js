function docDrop(e) {
      e.preventDefault();
      opts.docLeave.call(this, e);
      return false;
    }
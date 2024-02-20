function countRowHeaders() {
      var THs = instance.view.TBODY.querySelector('tr').querySelectorAll('th');
      return THs.length;
    }
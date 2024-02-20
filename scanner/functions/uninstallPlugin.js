function uninstallPlugin(target) {
    var events = ['go', 'previous', 'next', 'disable', 'enable', 'refresh', 'show', 'hide', 'destroy'];

    // off all events
    $.each(events, function(index, value) {
      target.off(eventPrefix + value);
    });

    // reset pagination data
    target.data('pagination', {});

    // remove pagination element
    $('.paginationjs', target).remove();
  }
function trash(items) {
  notify(lang['message-delete'], function () {
    performLfmRequest('delete', {
      items: items.map(function (item) { return item.name; })
    }).done(refreshFoldersAndItems)
  });
}
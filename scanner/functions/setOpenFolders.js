function setOpenFolders() {
  $('#tree [data-path]').each(function (index, folder) {
    // close folders that are not parent
    var should_open = ($('#working_dir').val() + '/').startsWith($(folder).data('path') + '/');
    $(folder).children('i')
      .toggleClass('fa-folder-open', should_open)
      .toggleClass('fa-folder', !should_open);
  });

  $('#tree .nav-item').removeClass('active');
  $('#tree [data-path="' + $('#working_dir').val() + '"]').parent('.nav-item').addClass('active');
}
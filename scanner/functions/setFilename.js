function setFilename(files) {
        var bookFilename = $('.book_filename');
        if (files.length > 0) {
          bookFilename.find('b').html(files[0].name);
          bookFilename.removeClass('hidden');
        } else
          bookFilename.addClass('hidden');
      }
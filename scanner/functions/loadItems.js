function loadItems(page) {
  loading(true);
  performLfmRequest('jsonitems', {show_list: show_list, sort_type: sort_type, page: page || 1}, 'html')
    .done(function (data) {
      selected = [];
      var response = JSON.parse(data);
      var working_dir = response.working_dir;
      items = response.items;
      var hasItems = items.length !== 0;
      var hasPaginator = !!response.paginator;
      $('#empty').toggleClass('d-none', hasItems);
      $('#content').html('').removeAttr('class');
      $('#pagination').html('').removeAttr('class');

      if (hasItems) {
        $('#content').addClass(response.display);
        $('#pagination').addClass('preserve_actions_space');

        items.forEach(function (item, index) {
          var template = $('#item-template').clone()
            .removeAttr('id class')
            .attr('data-id', index)
            .click(toggleSelected)
            .dblclick(function (e) {
              if (item.is_file) {
                use(getSelectedItems());
              } else {
                goTo(item.url);
              }
            });

          if (item.thumb_url) {
            var image = $('<div>').css('background-image', 'url("' + item.thumb_url + '?timestamp=' + item.time + '")');
          } else {
            var icon = $('<div>').addClass('ico');
            var image = $('<div>').addClass('mime-icon ico-' + item.icon).append(icon);
          }

          template.find('.square').append(image);
          template.find('.item_name').text(item.name);
          template.find('time').text((new Date(item.time * 1000)).toLocaleString());

          $('#content').append(template);
        });
      }

      if (hasPaginator) {
        createPagination(response.paginator);

        $('#pagination a').on('click', function(event) {
          event.preventDefault();

          loadItems($(this).closest('li')[0].getAttribute('data-num'));

          return false;
        });
      }

      $('#nav-buttons > ul').removeClass('d-none');

      $('#working_dir').val(working_dir);
      console.log('Current working_dir : ' + working_dir);
      var breadcrumbs = [];
      var validSegments = working_dir.split('/').filter(function (e) { return e; });
      validSegments.forEach(function (segment, index) {
        if (index === 0) {
          // set root folder name as the first breadcrumb
          breadcrumbs.push($("[data-path='/" + segment + "']").text());
        } else {
          breadcrumbs.push(segment);
        }
      });

      $('#current_folder').text(breadcrumbs[breadcrumbs.length - 1]);
      $('#breadcrumbs > ol').html('');
      breadcrumbs.forEach(function (breadcrumb, index) {
        var li = $('<li>').addClass('breadcrumb-item').text(breadcrumb);

        if (index === breadcrumbs.length - 1) {
          li.addClass('active').attr('aria-current', 'page');
        } else {
          li.click(function () {
            // go to corresponding path
            goTo('/' + validSegments.slice(0, 1 + index).join('/'));
          });
        }

        $('#breadcrumbs > ol').append(li);
      });

      var atRootFolder = getPreviousDir() == '';
      $('#to-previous').toggleClass('d-none invisible-lg', atRootFolder);
      $('#show_tree').toggleClass('d-none', !atRootFolder).toggleClass('d-block', atRootFolder);
      setOpenFolders();
      loading(false);
      toggleActions();
    });
}
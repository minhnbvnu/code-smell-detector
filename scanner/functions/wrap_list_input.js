function wrap_list_input (list_input) {
        var btn_remove = $('<a/>', {'class': 'btn btn-default input-group-addon'});
        btn_remove.append($('<i/>', {'class': 'fa fa-fw fa-trash'}));
        btn_remove.on('click', function () {
            var list_el = $(this).closest('li');
            var list_input = list_el.closest('.nbext-list-wrap');
            list_el.remove();
            list_input.change(); // trigger change event
        });

        return $('<li/>', {'class' : 'nbext-list-element input-group'}).append(
            $('<a class="btn btn-default input-group-addon handle"/>').append(
                $('<i class="fa fa-fw fa-arrows-v"/>')
            ),
            [list_input, btn_remove]);
    }
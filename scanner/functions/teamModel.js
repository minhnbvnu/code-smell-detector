function teamModel(modal)
    {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "post",
            url: '/get/team/modal',
            data: {modal: modal},
            success: function (data) {
                $('.modal').remove();
                if(modal === 'create')
                {
                    $('#teamCreateModal').remove();
                }
                if(modal === 'invite')
                {
                    $('#teamInviteModal').remove();
                }
                $('body').append(data.html);
                jQuery.noConflict();
                if(modal === 'create')
                {
                    $('#teamCreateModal').modal("show").on('hide', function() {
                        $('#teamCreateModal').modal('hide')
                    });
                }
                if(modal === 'invite')
                {
                    $('#teamInviteModal').modal("show").on('hide', function() {
                        $('#teamInviteModal').modal('hide')
                    });
                }
            }
        });
    }
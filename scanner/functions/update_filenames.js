function update_filenames(my_tags) {
        if (window.add_filenames) {
            var data = {
                        'id': sample_id_escaped,
                        'tags': my_tags.toString(),
            };
            $.ajax({
                type: "POST",
                url: update_sample_filenames,
                data: data,
                datatype: 'json',
                success: function(data) {
                    if (!data.success) {
                        alert("Failed to update filenames!");
                    }
                }
            });
        }
    }
function update_aliases(my_aliases) {
        if (window.add_exploit_cve) {
            var data = {
                        'oid': subscription_id,
                        'aliases': my_aliases.toString(),
            };
            $.ajax({
                type: "POST",
                url: update_exploit_cve,
                data: data,
                datatype: 'json',
                success: function(data) {
                    if (!data.success) {
                        alert("Failed to update aliases!");
                    }
                }
            });
        }
    }
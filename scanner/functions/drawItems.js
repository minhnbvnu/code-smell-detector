function drawItems() {
        db.view(design + "/recent-workspaces", {
            descending : "true",
            limit : 50,
            update_seq : true,
            success : function(data) {
                setupChanges(data.update_seq);
                var them = $.mustache($("#workspaces").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                $("#content").html(them);
            }
        });
    }
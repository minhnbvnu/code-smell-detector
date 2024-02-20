function update_actor_tags(tag_type, my_tags) {
        if (!actor_tags) {
            var oid = subscription_id;
            var itype = subscription_type;
            var data = {
                        'oid': oid,
                        'tags': my_tags.toString(),
                        'tag_type': tag_type,
            };
            $.ajax({
                type: "POST",
                url: actor_tags_modify,
                data: data,
                datatype: 'json',
            });
        }
    }
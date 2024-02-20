function get_available_tags(tag_type) {
        var tmp = [];
        $.ajax({
            async: false,
            type: "POST",
            url: actor_tags_list,
            data: {'type': tag_type},
            datatype: 'json',
            success: function(data) {
                if (tag_type == 'ActorIntendedEffect') {
                    available_intended_effects = tmp = data;
                } else if (tag_type == 'ActorMotivation') {
                    available_motivations = tmp = data;
                } else if (tag_type == 'ActorSophistication') {
                    available_sophistications = tmp = data;
                } else if (tag_type == 'ActorThreatType') {
                    available_threat_types = tmp = data;
                }
            }
        });
        return tmp;
    }
function filter_register_new_tag (new_tag_object) {
        for (var ii=0; ii < tags.length; ii++) {
            if (tags[ii].value == new_tag_object.value && tags[ii].category == new_tag_object.category) {
                return; // tag already exists, so don't insert again
            }
        }
        new_tag_object.label = new_tag_object.category + ': ' + new_tag_object.value;
        tags.push(new_tag_object);
    }
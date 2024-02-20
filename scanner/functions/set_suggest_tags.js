function set_suggest_tags(anchor_id) {
    $(`#${anchor_id}`).amsifySuggestags({
        suggestionsAction : {
            url : '/manage/tags/suggest',
            method: 'GET',
            timeout: -1,
            minChars: 2,
            minChange: -1,
            delay: 100,
            type: 'GET',
            dataType: null
        }
    });
}
function getRequest()
{
    var request = {
            current: this.current,
            rowCount: this.rowCount,
            sort: this.sortDictionary,
            searchPhrase: this.searchPhrase
        },
        post = this.options.post;

    post = ($.isFunction(post)) ? post() : post;
    return this.options.requestHandler($.extend(true, request, post));
}
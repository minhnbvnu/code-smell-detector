function GET_PAGE_POSITION(obj) {
    var docEl = document.documentElement;
    var rect = obj.getBoundingClientRect();
    return new maptalks.Point(rect['left'] + docEl['scrollLeft'], rect['top'] + docEl['scrollTop']);
}
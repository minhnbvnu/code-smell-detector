function pageSelect(event) {
    var selected = document.getElementsByClassName('page-selected');
    if (selected.length > 0) {
        selected[0].className = 'page';
    }

    displayGlyphPage(+event.target.id.substr(1));
}
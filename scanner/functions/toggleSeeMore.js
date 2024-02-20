function toggleSeeMore(element) {
    let ariaExpanded = element.getAttribute('aria-expanded');
    if (ariaExpanded === 'false') {
        element.innerHTML = '&gt; See less';
    } else {
        element.innerHTML = '&gt; See more';
    }
}
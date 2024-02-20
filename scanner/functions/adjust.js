function adjust() {
    window.scrollBy(0, -55);
    var el = document.querySelector('.inner-link-active');
    if (el) el.classList.remove('inner-link-active');

    // ``[ ] . ' " @`` are not valid in DOM id. so must escape these.
    var id = location.hash.replace(/([\[\].'"@$])/g, '\\$1');
    var el = document.querySelector(id);
    if (el) el.classList.add('inner-link-active');
  }
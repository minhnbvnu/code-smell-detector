function setIDEEnable(value) {
    inPageReload = true;
    location = location.href.replace(/([&?])IDE=./g, '$1') + '&IDE=' + (value ? 1 : 0);
}
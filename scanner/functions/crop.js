function crop(item) {
  performLfmRequest('crop', {img: item.name})
    .done(hideNavAndShowEditor);
}
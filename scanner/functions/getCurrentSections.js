function getCurrentSections()
{
  return currentSlide.find("div.notes-section").map(function() {
    return $(this).attr('class').split(' ').filter(function(x) { return x != 'notes-section'; });
  });
}
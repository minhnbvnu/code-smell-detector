function printDialog() {
  var list = $('#print-modal #print-sections');

  if(! list.hasClass('processed')) {
    sections = getAllSections()
    sections.unshift('') // add the "none" option
    sections.forEach(function(section) {
      var link = $('<a>');
      var item = $('<li>');
      link.attr('href', '#');
      link.click(function(){
        printSlides(section);
      });

      switch(section) {
        case '':
          link.text(I18n.t('presenter.print.none'));
          break;
        case 'notes':
          link.text(I18n.t('presenter.print.notes'));
          break;
        case 'handouts':
          link.text(I18n.t('presenter.print.handouts'));
          break;
        default:
          link.text(section);
      }

      item.append(link);
      list.append(item);
    });
    list.addClass('processed');
  }

  $("#print-modal").dialog("open");
}
function printSlides(section)
{
  try {
    var printWindow = window.open('print/'+section);
    $(printWindow).on('load', function(){
      printWindow.window.print();
    });
  }
  catch(e) {
    console.log('Failed to open print window. Popup blocker?');
  }
  $("#print-modal").dialog("close");
}
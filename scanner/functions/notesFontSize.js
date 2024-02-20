function notesFontSize(action) {
  var current = parseInt($('#notes').css('font-size'));
  switch (action) {
    case 'increase':
      $('#notes').css('font-size', current * 1.1);
      break;

    case 'decrease':
      $('#notes').css('font-size', current * 0.9);
      break;

    case 'reset':
      $('#notes').css('font-size', '');
      break;
  }
}
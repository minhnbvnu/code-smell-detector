function setExecutionSignal(status, codeDiv) {
  if (status === true) {
    codeDiv.addClass("executing");
  }
  else {
    codeDiv.removeClass("executing");
  }

  // if we're a presenter, mirror this on the display window
  try {
    var id    = codeDiv.closest('div.slide').attr('id');
    var index = $('div.slide#'+id+' code.execute').index(codeDiv);
    var code  = slaveWindow.$('div.slide#'+id+' code.execute').eq(index)

    if (status === true) {
      code.addClass("executing");
    }
    else {
      code.removeClass("executing");
    }
  } catch (e) {};
}
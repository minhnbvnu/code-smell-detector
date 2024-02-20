function renderChoices(choices, pointer) {
  var output = '';
  var separatorOffset = 0;

  choices.forEach(function(choice, i) {
    output += '\n  ';

    if (choice.type === 'separator') {
      separatorOffset++;
      output += ' ' + choice;
      return;
    }

    var index = i - separatorOffset;
    var display = index + 1 + ') ' + choice.name;
    if (index === pointer) {
      display = chalk.cyan(display);
    }
    output += display;
  });

  return output;
}
async function promptHandler(prompt, answers, input) {
  if (prompt.when === false) {
    return;
  }
  if (isFunction(prompt.when) && !await prompt.when(answers)) {
    return;
  }
  if (isFunction(prompt.message)) {
    // Just for coverage
    prompt.message(answers);
  }
  if (isFunction(prompt.transformer)) {
    // Just for coverage
    prompt.message(input);
  }

  let answer = input;
  if (isUndefined(answer)) {
    if (isFunction(prompt.default)) {
      answer = await prompt.default(answers);
    } else {
      answer = prompt.default;
    }
    if (isNumber(answer) && prompt.type in ['list', 'rawlist', 'expand']) {
      if (isFunction(prompt.choiches)) {
        answer = await prompt.choiches(answers)[answer];
      } else {
        answer = prompt.choiches[answer];
      }
    }
  }

  if (isUndefined(answer)) {
    switch (prompt.type) {
    case 'expand':
      answer = {
        key: 'h',
        name: 'Help, list all options',
        value: 'help'
      };
      break;
    case 'checkbox':
      answer = [];
      break;
    case 'confirm':
      answer = false;
      break;
    default:
      if (Array.isArray(prompt.choiches)) {
        [answer] = prompt.choiches;
      } else if (isFunction(prompt.choiches)) {
        [answer] = await prompt.choiches(answers);
      } else {
        answer = '';
      }
    }
  }

  if (isFunction(prompt.filter)) {
    answer = await prompt.filter(answer);
  }
  if (isFunction(prompt.validate)) {
    const valid = await prompt.validate(answer, answers);
    if (valid !== true) {
      throw new Error(valid);
    }
  }
  return answer;
}
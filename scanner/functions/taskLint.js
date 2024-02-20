function taskLint (str) {
  const config = {
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "script",
      "ecmaFeatures": {
        "jsx": false,
        "experimentalObjectRestSpread": true
      }
    },
    "rules": {
      "semi": 2
    }
  };

  const messages = ESLint.verify(str, config);
  if (messages.length) {
    const lines = str.split('\n');
    const err = messages.map(err => {
      return `${err.message} in line ${err.line}\n${lines[err.line-1]}`;
    }).join('\n\n');

    throw new Error(err);
  }
}
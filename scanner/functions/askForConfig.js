function askForConfig() {
  const questions = [
    {
      type: 'text',
      name: 'url',
      message: "What's your page url ?",
      validate: function(value) {
        const urlReg = /^https?:\/\/.+/ig;
        if (urlReg.test(value)) {
          return true;
        }
  
        return 'Please enter a valid url';
      }
    },
    {
      type: 'text',
      name: 'filepath',
      message: "Enter a relative output filepath ? (optional)",
      validate: function(value) {
        const filepath = path.isAbsolute(value) ? value : path.join(__dirname, value);
        const exists = fs.existsSync(filepath);
        
        if(value && !exists) {
          return 'Please enter a exists target';
        }
        return true;
      }
    }
  ];
  return prompts(questions);
}
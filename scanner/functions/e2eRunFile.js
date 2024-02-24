function e2eRunFile(options, doneCallback){
  if(!options || typeof options !== 'object'){
    // default options
    options = defaultOptions
  }
  let selectedOption = {...defaultOptions}
  Object.assign(selectedOption, options)

  exec(`node ${selectedOption.interpreter} ${selectedOption.target}`, (err, stdout, stderr) => {
    if(stdout){
      expect(stdout).toContain(selectedOption.contain)
    }
    if(err){
      doneCallback(err)
    }
    if(stderr){
      doneCallback(err)
    }
    doneCallback()
  })

}
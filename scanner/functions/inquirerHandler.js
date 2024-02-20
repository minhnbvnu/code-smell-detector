function inquirerHandler(inputs) {
  /**
   * @param  {Object} prompts
   * @return {Promise.<Object>}
   */
  return async prompts => {
    const answers = {};
    for (const prompt of [].concat(prompts)) {
      answers[prompt.name] = await promptHandler(
        prompt,
        answers,
        inputs[prompt.name]
      );
    }
    return answers;
  };
}
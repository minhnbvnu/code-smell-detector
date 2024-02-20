function getShortenedPrompt(reqBody) {
  const prompt =
    reqBody.prompt || reqBody.input || reqBody.messages.map((m) => m.content).join('\n')

  return prompt.split('\n')[0]
}
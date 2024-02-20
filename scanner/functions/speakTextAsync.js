async function speakTextAsync (synthesizer, pendingText) {
  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(pendingText, result => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        logger.info('speakTextAsync: true')
        resolve()
      } else {
        console.error('Speech synthesis canceled, ' + result.errorDetails +
            '\nDid you update the subscription info?')
        reject(result.errorDetails)
      }
    }, err => {
      console.error('err - ' + err)
      reject(err)
    })
  })
}
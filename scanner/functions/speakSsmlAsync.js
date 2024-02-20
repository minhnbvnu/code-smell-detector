async function speakSsmlAsync (synthesizer, ssml) {
  return new Promise((resolve, reject) => {
    synthesizer.speakSsmlAsync(ssml, result => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        logger.info('speakSsmlAsync: true')
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
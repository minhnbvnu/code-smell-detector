async function generateAudio (text, options = {}) {
  let host = Config.voicevoxSpace
  let speaker = options.speaker || '随机'
  if (speaker === '随机') {
    speaker = supportConfigurations[Math.floor(Math.random() * supportConfigurations.length)].name
  }
  let regex = /^(.*?)-(.*)$/
  let match = regex.exec(speaker)
  let style = null
  if (match) {
    speaker = match[1]
    style = match[2]
  }
  speaker = supportConfigurations.find(s => s.name === speaker)
  let speakerId
  if (style) {
    speakerId = speaker.styles.find(s => s.name === style).id
  } else {
    speakerId = speaker.styles[Math.floor(Math.random() * speaker?.styles.length)].id
  }
  logger.info(`使用${speaker.name}的${speaker.styles.find(s => s.id === speakerId).name}风格基于文本${text}生成语音。`)
  const accentPhrasesResponse = await newFetch(`${host}/accent_phrases?text=${encodeURIComponent(text)}&speaker=${speakerId}`, {
    method: 'POST'
  })

  const accentPhrases = await accentPhrasesResponse.json()

  const synthesisResponse = await newFetch(`${host}/synthesis?speaker=${speakerId}&enable_interrogative_upspeak=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accent_phrases: accentPhrases,
      speedScale: 1,
      pitchScale: 0,
      intonationScale: 1,
      volumeScale: 1,
      prePhonemeLength: 0.1,
      postPhonemeLength: 0.1,
      outputSamplingRate: 24000,
      outputStereo: false
    })
  })

  const synthesisResponseData = await synthesisResponse.arrayBuffer()
  return Buffer.from(synthesisResponseData)
}
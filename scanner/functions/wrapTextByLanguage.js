function wrapTextByLanguage (text) {
  // 根据标点符号分割句子
  const symbols = /([。！？，])/
  let sentences = text.split(symbols)
  sentences = sentences.reduce((acc, cur, index) => {
    if (symbols.test(cur)) {
      // 如果当前字符串是标点符号，则将其添加到前一个字符串的末尾
      acc[acc.length - 1] += cur
    } else {
      // 否则，将当前字符串添加到结果数组中
      acc.push(cur)
    }

    return acc
  }, [])
  let wrappedSentences = []
  for (let i = 0; i < sentences.length; i++) {
    let sentence = sentences[i]

    // 如果是标点符号，则跳过
    if (sentence === '。' || sentence === '！' || sentence === '？' || sentence === '，') {
      continue
    }
    const pattern = /[a-zA-Z]/g
    sentence = sentence.replace(pattern, '')
    // 判断这一句话是中文还是日语
    let isChinese = true
    let isJapanese = false
    for (let j = 0; j < sentence.length; j++) {
      let char = sentence.charAt(j)
      if (char.match(/[\u3040-\u309F\u30A0-\u30FF]/)) {
        isJapanese = true
        isChinese = false
        break
      }
    }

    // 包裹句子
    if (isChinese) {
      sentence = `[ZH]${sentence}[ZH]`
    } else if (isJapanese) {
      sentence = `[JA]${sentence}[JA]`
    }

    wrappedSentences.push(sentence)
  }

  const mergedSentences = wrappedSentences.reduce((acc, cur) => {
    if (cur === '') {
      // 如果当前字符串为空或者是标点符号，则直接将其添加到结果数组中
      acc.push(cur)
    } else {
      // 否则，判断前一个字符串和当前字符串是否为同种语言
      const prev = acc[acc.length - 1]
      let curPrefix = `${cur.slice(0, 4)}`
      if (prev && prev.startsWith(curPrefix)) {
        // 如果前一个字符串和当前字符串为同种语言，则将它们合并
        let a = (acc[acc.length - 1] + cur)
        a = lodash.replace(a, curPrefix + curPrefix, '')
        acc[acc.length - 1] = a
      } else {
        // 否则，将当前字符串添加到结果数组中
        acc.push(cur)
      }
    }

    return acc
  }, [])

  return mergedSentences.join('')
}
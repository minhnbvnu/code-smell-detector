async function getImageOcrText (e) {
  const img = await getImg(e)
  if (img) {
    try {
      let resultArr = []
      let eachImgRes = ''
      if (!e.bot.imageOcr || typeof e.bot.imageOcr !== 'function') {
        e.bot.imageOcr = async (image) => {
          if (Config.extraUrl) {
            let md5 = image.split(/[/-]/).find(s => s.length === 32)?.toUpperCase()
            let filePath = await downloadFile(image, `ocr/${md5}.png`)
            let formData = new FormData()
            formData.append('file', fileFromSync(filePath))
            let res = await fetch(`${Config.extraUrl}/ocr?lang=chi_sim%2Beng`, {
              body: formData,
              method: 'POST',
              headers: {
                from: 'ikechan8370'
              }
            })
            if (res.status === 200) {
              return {
                wordslist: [{ words: await res.text() }]
              }
            }
          }
          return {
            wordslist: []
          }
        }
      }
      for (let i in img) {
        const imgOCR = await e.bot.imageOcr(img[i])

        for (let text of imgOCR.wordslist) {
          eachImgRes += (`${text?.words}  \n`)
        }
        if (eachImgRes) resultArr.push(eachImgRes)
        eachImgRes = ''
      }
      // logger.warn('resultArr', resultArr)
      return resultArr
    } catch (err) {
      logger.warn(err)
      logger.warn('OCR失败，可能使用的适配器不支持OCR')
      return false
      // logger.error(err)
    }
  } else {
    return false
  }
}
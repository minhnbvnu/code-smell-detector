async function uploadRecord (recordUrl, ttsMode = 'vits-uma-genshin-honkai', ignoreEncode = false) {
  let recordType = 'url'
  let tmpFile = ''
  if (ttsMode === 'azure') {
    recordType = 'file'
  } else if (ttsMode === 'voicevox') {
    recordType = 'buffer'
    tmpFile = `data/chatgpt/tts/tmp/${crypto.randomUUID()}.wav`
  }
  if (ignoreEncode) {
    return segment.record(recordUrl)
  }
  let result
  if (pcm2slk) {
    result = await getPttBuffer(recordUrl, Bot.config.ffmpeg_path)
  } else if (Config.cloudTranscode) {
    logger.mark('使用云转码silk进行高清语音生成:"')
    try {
      if (recordType === 'buffer') {
        // save it as a file
        mkdirs('data/chatgpt/tts/tmp')
        fs.writeFileSync(tmpFile, recordUrl)
        recordType = 'file'
        recordUrl = tmpFile
      }
      if (recordType === 'file' || Config.cloudMode === 'file') {
        if (!recordUrl) {
          logger.error('云转码错误：recordUrl 异常')
          return false
        }
        const formData = new FormData()
        let buffer
        if (!recordUrl.startsWith('http')) {
          // 本地文件
          formData.append('file', fileFromSync(recordUrl))
        } else {
          let response = await fetch(recordUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI 9 Build/SKQ1.211230.001)'
            }
          })
          const blob = await response.blob()
          const arrayBuffer = await blob.arrayBuffer()
          buffer = Buffer.from(arrayBuffer)
          formData.append('file', new File([buffer], 'audio.wav'))
        }
        const cloudUrl = new URL(Config.cloudTranscode)
        const resultres = await fetch(`${cloudUrl}audio`, {
          method: 'POST',
          body: formData
        })
        let t = await resultres.arrayBuffer()
        try {
          result = {
            buffer: {
              data: t
            }
          }
        } catch (e) {
          logger.error(t)
          throw e
        }
      } else {
        const cloudUrl = new URL(Config.cloudTranscode)
        const resultres = await fetch(`${cloudUrl}audio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ recordUrl })
        })
        let t = await resultres.text()
        try {
          result = JSON.parse(t)
        } catch (e) {
          logger.error(t)
          throw e
        }
      }
      if (result.error) {
        logger.error('云转码API报错：' + result.error)
        return false
      }
      result.buffer = Buffer.from(result.buffer.data)
    } catch (err) {
      logger.error('云转码API报错：' + err)
      return false
    }
  } else {
    return false
  }
  if (!result.buffer) {
    return false
  }
  let buf = Buffer.from(result.buffer)
  const hash = md5(buf)
  const codec = String(buf.slice(0, 7)).includes('SILK') ? 1 : 0
  const body = core.pb.encode({
    1: 3,
    2: 3,
    5: {
      1: Contactable.target,
      2: getUin(),
      3: 0,
      4: hash,
      5: buf.length,
      6: hash,
      7: 5,
      8: 9,
      9: 4,
      11: 0,
      10: Bot.apk.version,
      12: 1,
      13: 1,
      14: 0,
      15: 1
    }
  })
  const payload = await Bot.sendUni('PttStore.GroupPttUp', body)
  const rsp = core.pb.decode(payload)[5]
  rsp[2] && (0, errors.drop)(rsp[2], rsp[3])
  const ip = rsp[5]?.[0] || rsp[5]; const port = rsp[6]?.[0] || rsp[6]
  const ukey = rsp[7].toHex(); const filekey = rsp[11].toHex()
  const params = {
    ver: 4679,
    ukey,
    filekey,
    filesize: buf.length,
    bmd5: hash.toString('hex'),
    mType: 'pttDu',
    voice_encodec: codec
  }
  const url = `http://${int32ip2str(ip)}:${port}/?` + querystring.stringify(params)
  const headers = {
    'User-Agent': `QQ/${Bot.apk.version} CFNetwork/1126`,
    'Net-Type': 'Wifi'
  }
  await fetch(url, {
    method: 'POST', // post请求
    headers,
    body: buf
  })

  const fid = rsp[11].toBuffer()
  const b = core.pb.encode({
    1: 4,
    2: getUin(),
    3: fid,
    4: hash,
    5: hash.toString('hex') + '.amr',
    6: buf.length,
    11: 1,
    18: fid,
    30: Buffer.from([8, 0, 40, 0, 56, 0])
  })
  if (tmpFile) {
    try {
      fs.unlinkSync(tmpFile)
    } catch (err) {
      logger.warn('fail to delete temp audio file')
    }
  }
  return {
    type: 'record', file: 'protobuf://' + Buffer.from(b).toString('base64')
  }
}
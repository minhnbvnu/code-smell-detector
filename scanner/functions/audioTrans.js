async function audioTrans (file, ffmpeg = 'ffmpeg') {
  const tmpfile = path.join(TMP_DIR, uuid())
  const cmd = IS_WIN
    ? `${ffmpeg} -i "${file}" -f s16le -ac 1 -ar 24000 "${tmpfile}"`
    : `exec ${ffmpeg} -i "${file}" -f s16le -ac 1 -ar 24000 "${tmpfile}"`
  return new Promise((resolve, reject) => {
    // 隐藏windows下调用ffmpeg的cmd弹窗
    const options = IS_WIN ? { windowsHide: true, stdio: 'ignore' } : {}
    child_process.exec(cmd, options, async (error, stdout, stderr) => {
      try {
        resolve(pcm2slk(fs.readFileSync(tmpfile)))
      } catch {
        reject(new core.ApiRejection(ErrorCode.FFmpegPttTransError, '音频转码到pcm失败，请确认你的ffmpeg可以处理此转换'))
      } finally {
        fs.unlink(tmpfile, NOOP)
      }
    })
  })
}
async function getKeyv () {
  let Keyv
  try {
    Keyv = (await import('keyv')).default
  } catch (error) {
    throw new Error('keyv依赖未安装，请使用pnpm install keyv安装')
  }
  return Keyv
}
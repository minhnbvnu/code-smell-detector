function parseAccountToUcid (account) {
  let ucid = ''
  let accountMd5 = md5(account)
  accountMd5 = accountMd5.slice(0, 16)
  for (let index = 0; index < accountMd5.length; index++) {
    ucid += accountMd5.charCodeAt(index)
  }
  return ucid
}
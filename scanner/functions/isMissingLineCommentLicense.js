function isMissingLineCommentLicense(comments) {
  for (let i = 0; i < LINE_REGEXES.length; i++) {
    if (!comments[i] || !LINE_REGEXES[i].test(comments[i].value)) {
      return true;
    }
  }

  return false;
}
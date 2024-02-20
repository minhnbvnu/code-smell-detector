function openRepoUrl(history) {
  if (process.env.NODE_ENV === 'production') {
    history.push('/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  } else {
    window.open('https://im.aermin.top/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e');
  }
}
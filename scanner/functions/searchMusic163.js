async function searchMusic163 (name) {
  let response = await fetch(`http://music.163.com/api/search/get/web?s=${name}&type=1&offset=0&total=true&limit=6`)
  let json = await response.json()
  if (json.result?.songCount > 0) {
    return json.result.songs.map(song => {
      return `id: ${song.id}, name: ${song.name}, artists: ${song.artists.map(a => a.name).join('&')}, alias: ${song.alias || 'none'}`
    }).join('\n')
  }
  return null
}
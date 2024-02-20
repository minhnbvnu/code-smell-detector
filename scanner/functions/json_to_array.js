function json_to_array (key, jsonData) {
  return jsonData.map(v => key.map(j => { return v[j] }))
}
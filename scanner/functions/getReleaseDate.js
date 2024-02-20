function getReleaseDate() {
  const tz = process.env.TZ
  process.env.TZ = 'America/Los_Angeles'
  const today = new Date(Date.now()).toLocaleDateString()
  process.env.TZ = tz

  const parts = today.split('/')
  return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`
}
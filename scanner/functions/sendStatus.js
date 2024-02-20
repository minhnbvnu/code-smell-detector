async function sendStatus(account, status, edit) {
  console.log(status)

  if (!argv.noop && (!account.throttle || !isRepeat(edit))) {

    // wait a couple seconds and get a screenshot of the diff
    await new Promise(r => setTimeout(r, 2000));  
    const screenshot = await takeScreenshot(edit.url)

    // Mastodon
    if (account.mastodon) {
      const mastodon = new Mastodon(account.mastodon)
      const response = await mastodon.post('media', {file: fs.createReadStream(screenshot)})
      if (!response.data.id) {
        console.log('error uploading screenshot to mastodon')
        return
      }

      await mastodon.post(
        'statuses', 
        {'status': status, media_ids: [response.data.id]},
        err => {
          if (err) {
            console.log(`mastodon post failed: ${err}`)
          }
        }
      )
    }

    // Twitter
    if (account.access_token) {
      const twitter = new Twit(account)
      const b64content = fs.readFileSync(screenshot, {encoding: 'base64'})

      // upload the screenshot to twitter
      twitter.post('media/upload', {media_data: b64content}, function(err, data, response) {
        if (err) {
          console.log(err)
          return
        }

        // add alt text for the media, for use by screen readers
        const mediaIdStr = data.media_id_string
        const altText = "Screenshot of edit to " + edit.page
        const metaParams = {media_id: mediaIdStr, alt_text: {text: altText}}

        twitter.post('media/metadata/create', metaParams, function(err, data, response) {
          if (err) {
            console.log('metadata upload for twitter screenshot alt text failed with error', err)
          }
          const params = {
            'status': status,
            'media_ids': [mediaIdStr]
          }
          twitter.post('statuses/update', params, function(err) {
            if (err) {
              console.log(err)
            }
          })
        })
      })
    }

    // screenshot no longer needed
    fs.unlinkSync(screenshot)
  }
}
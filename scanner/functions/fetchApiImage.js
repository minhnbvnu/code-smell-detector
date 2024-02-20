function fetchApiImage (apiList) {
  apiList.forEach(api => {
    if (!api.logo) {
      const key = api.apiStage == null ? api.id : `${api.apiId}_${api.apiStage}`
      const specificLogo = `/custom-content/api-logos/${key}.png`

      // fetch automatically follows redirects; setting redirect to `manual` prevents this
      // we need to prevent it so that we can accurately determine if the image exists
      window.fetch(specificLogo, { headers: { Accept: 'image/png' }, redirect: 'manual' }).then(response => {
        if (response.ok) { api.logo = specificLogo } else api.logo = '/custom-content/api-logos/default.png'
      })
    }
  })
}
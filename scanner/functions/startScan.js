function startScan(Camera, scanner) {
      load()
      Camera.getCameras().then(pickCam).then(cam => {
        document.body.classList.add('qr-scanning')
        scanner.start(cam)
      })
    }
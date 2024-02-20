function stopScan(scanner) {
      document.body.classList.remove('qr-scanning')
      scanner.stop()
    }
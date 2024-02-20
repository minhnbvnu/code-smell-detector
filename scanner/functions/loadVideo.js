function loadVideo() {
      if (mode === 'video') return

      var video = el.append('video')
        .attr('autoplay', 'autoplay')
        .style('display', 'none')

      navigator.getUserMedia({video: true}, function(stream) {
        video.node().onloadeddata = function() {
          // This `setInterval` is a hack to solve a bug with FireFox.
          var inter = setInterval(function() {
            if (!video.node().videoWidth) return
            clearInterval(inter)
            didLoadVideo = true
            mode = 'video'
            vw = video.node().videoWidth, vh = video.node().videoHeight
            sw = cw / vw, sh = ch / vh, vs = sw < sh ? sw : sh
            ctx.clearRect(0, 0, w, h)
            startTimer()
          }, 100)
        }
        video.node().src = window.URL.createObjectURL(stream)
        localMediaStream = stream
      }, function(err) {
        alert('Unable to start video with your permission.')
      })

      function startTimer() {
        d3.timer(function() {
          if (mode === 'image') return true
          if (!localMediaStream || !didLoadVideo) return false
          var x_off = w - cw
          ctx.save()
          ctx.translate(x_off, 0)
          ctx.scale(vs, vs)
          ctx.drawImage(video.node(), 0, 0)
          var dw = Math.round(vw * vs), dh = Math.round(vh * vs)
          var idata = ctx.getImageData(x_off, 0, dw, dh)
          dw = idata.width, dh = idata.height
          var d1 = idata.data
          ctx.clearRect(-1, 0, vw + 2, vh)
          for(var i =  0; i < d1.length / 4; i++) data1[i] = d1[i * 4]
          var k = scope.kernel.map(function(d) { return +d })
          scope.kernelFunc(data1, dw, dh, k, data2)
          var idata = ctx.createImageData(dw, dh)
          for(var i = 0; i < idata.data.length; i+=4) {
            idata.data[i + 0] = data2[i / 4]
            idata.data[i + 1] = data2[i / 4]
            idata.data[i + 2] = data2[i / 4]
            idata.data[i + 3] = 255
          }
          ctx.putImageData(idata, x_off, 0)
          ctx.restore()
          return false
        })
      }
    }
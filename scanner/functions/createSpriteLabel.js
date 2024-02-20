function createSpriteLabel(x, y, z, text) {
      var canvas = document.createElement('canvas')
      var w = 256, h = 256
      canvas.width = w, canvas.height = h
      var ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgba(0,0,0,1)'
      ctx.font = "100 30px Lato, sans-serif"
      ctx.textAlign = 'center'
      ctx.fillText(text, w / 2, h / 2 + 22)
      var texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      var material = new THREE.SpriteMaterial({map: texture, color: 0xffffff})
      var sprite = new THREE.Sprite(material)
      sprite.scale.set(0.5, 0.5, 1)
      sprite.position.x = x
      sprite.position.y = y
      sprite.position.z = z
      return sprite
    }
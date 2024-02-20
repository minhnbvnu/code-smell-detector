function spawnWave() {
    let width = kontra.imageAssets.enemy.width;
    let x = 100;
    let y = -kontra.imageAssets.enemy.height;
    let spacer = y * 1.5;

    for (let i = 1; i <= 18; i++) {
      enemies.get({
        x: x,
        y: y,
        dy: 2,
        image: kontra.imageAssets.enemy,
        ttl: Infinity,
        leftEdge: x - 90,
        rightEdge: x + 90 + width,
        bottomEdge: y + 140,
        speed: 2,
        type: 'enemy',
        update: function () {
          this.advance();

          // change enemy velocity to move back and forth
          if (this.x <= this.leftEdge) {
            this.dx = this.speed;
          } else if (this.x >= this.rightEdge) {
            this.dx = -this.speed;
          } else if (this.y >= this.bottomEdge) {
            this.dy = 0;
            this.dx = -this.speed;
            this.y -= 5;
          }

          // randomly fire bullets
          if (Math.floor(Math.random() * 101) / 100 < 0.01) {
            enemyBullets.get({
              x: this.x + this.width / 2,
              y: this.y + this.height,
              dy: 2.5,
              image: kontra.imageAssets.bullet_enemy,
              ttl: 150,
              type: 'hostile'
            });
          }
        }
      });

      x += width + 25;

      if (i % 6 === 0) {
        x = 100;
        y += spacer;
      }
    }
  }
function gameloop() {
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText =
                "left:" +
                hearts[i].x +
                "px;top:" +
                hearts[i].y +
                "px;opacity:" +
                hearts[i].alpha +
                ";transform:scale(" +
                hearts[i].scale +
                "," +
                hearts[i].scale +
                ") rotate(45deg);background:" +
                hearts[i].color;
        }
        requestAnimationFrame(gameloop);
    }
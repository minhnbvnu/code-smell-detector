function initScene() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    //add score to the navbar by adding a span with the class name navbar__item and id breakout-score
    const score = document.createElement("span");
    score.className = "navbar__item navbar__link";
    score.id = "breakout-score";
    score.innerText = "Score: 0";
    function setupDom() {
      document.querySelector(".navbar__items").appendChild(score);
      // change all h1 tags to say "Strapi Breakout - Press Enter To Start"
      document.querySelectorAll("h1").forEach((h1) => {
        // store the original text in the data-original-text attribute
        h1.setAttribute("data-original-text", h1.innerText);
        h1.innerText = "Strapi Breakout";
        // add smaller instructions below in an h2
        const h2 = document.createElement("h2");
        h2.innerText = "Press Enter to Start \n Press Esc to Exit";
        h1.parentNode.insertBefore(h2, h1.nextSibling);
      });
      //store the original title in the data-original-title attribute
      document.ogTitle = document.title;
      // animate document title with a marquee saying "Strapi Breakout" with padding
      document.title = `Strapi Breakout - Press Enter to Start - Press Esc to Exit- `;
      // animate title
      let title = document.title;
      let titleLength = title.length;
      let titleIndex = 0;
      titleInterval = setInterval(() => {
        titleIndex++;
        if (titleIndex > titleLength) {
          titleIndex = 0;
        }
        document.title = title.slice(titleIndex) + title.slice(0, titleIndex);
      }, 200);

      // set scroll to top
      window.scrollTo(0, 0);
    }
    // if window is loaded just add if not wait for onload
    if (document.readyState === "complete") {
      setupDom();
    } else {
      window.addEventListener("load", setupDom);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // reset profile index to maintain order of profiles.
    Particle.profileIndex = 0;

    // Create an image object and load the image file
    const img = new Image();
    img.src = "/img/strapi.png";

    // Once the image is loaded, draw it on the canvas
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      const padding = 300;
      const newWidth = ww - padding;
      const newHeight = newWidth / aspectRatio;
      // center the image
      ctx.drawImage(
        img,
        padding / 2,
        (wh - img.height) / 2,
        newWidth,
        newHeight
      );

      // Get the image data and create particles
      const data = ctx.getImageData(0, 0, ww, wh).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      Particle.particles = [];
      for (let i = 0; i < ww; i += Math.round(ww / 80)) {
        for (let j = 0; j < wh; j += Math.round(ww / 80)) {
          if (data[(i + j * ww) * 4 + 3] > 80) {
            Particle.particles.push(new Particle(i, j, ww, wh, game));
          }
        }
      }
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * ww;
        const y = Math.random() * wh;
        const size = Math.random() * 25 + 10;
        const color = `${Math.floor(Math.random() * 256)},${Math.floor(
          Math.random() * 256
        )},${Math.floor(Math.random() * 256)}`;
        Firework.fireworks.push(new Firework(x, y, size, color));
      }
      bar = new Bar(ww, wh);
      ball = new Ball(ww, wh, bar);
      window.bar = bar;
      window.ball = ball;
    };
  }
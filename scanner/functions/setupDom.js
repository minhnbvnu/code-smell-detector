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
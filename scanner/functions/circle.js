function circle(index) {

      // a simple positive modulo using slides.length
      return (slides.length + (index % slides.length)) % slides.length;

    }
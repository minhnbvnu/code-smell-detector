function NaverWcslog(source) {
      window.wcs_add = {};
      window.wcs_do = noopFunc;
      window.wcs = {
        inflow: noopFunc
      };
      hit(source);
    }
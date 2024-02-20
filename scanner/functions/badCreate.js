function badCreate() {
          var x = new Jed({
            "domain" : "missing_domain",
            "locale_data" : locale_data
          });
          return x;
        }
function setPosition( label, sizes, prc ) {
        sizes.margin = -sizes.label/2;
        var domSize = !self.settings.vertical ? self.sizes.domWidth : self.sizes.domHeight;

        if (self.sizes.domWidth) {
          // left limit
          var label_left = sizes.border + sizes.margin;
          if(label_left < 0)
            sizes.margin -= label_left;

          // right limit
          if(self.sizes.domWidth > 0 && sizes.border+sizes.label / 2 > domSize){
            sizes.margin = 0;
            sizes.right = true;
          } else
          sizes.right = false;
        }

        if (!self.settings.vertical)
          label.o.css({ left: prc + "%", marginLeft: sizes.margin+"px", right: "auto" });
        else
          label.o.css({ top: prc + "%", marginLeft: "20px", marginTop: sizes.margin, bottom: "auto" });
        if(sizes.right && self.sizes.domWidth > 0) {
          if (!self.settings.vertical)
            label.o.css({ left: "auto", right: 0 });
          else
            label.o.css({ top: "auto", bottom: 0 });
        }
        return sizes;
      }
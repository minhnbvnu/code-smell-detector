function AddImage(i, o, t, tc) {
  var s = tc.imageScale, mscale, ic, bc, oc, iw, ih;
  // image not loaded, wait for image onload
  if(!o.complete)
    return AddHandler('load',function() { AddImage(i,o,t,tc); }, o);
  if(!i.complete)
    return AddHandler('load',function() { AddImage(i,o,t,tc); }, i);

  // Yes, this does look like nonsense, but it makes sure that both the
  // width and height are actually set and not just calculated. This is
  // required to keep proportional sizes when the images are hidden, so
  // the images can be used again for another cloud.
  o.width = o.width;
  o.height = o.height;

  if(s) {
    i.width = o.width * s;
    i.height = o.height * s;
  }
  // the standard width of the image, with imageScale applied
  t.iw = i.width;
  t.ih = i.height;
  if(tc.txtOpt) {
    ic = i;
    mscale = tc.zoomMax * tc.txtScale;
    iw = t.iw * mscale;
    ih = t.ih * mscale;
    if(iw < o.naturalWidth || ih < o.naturalHeight) {
      ic = ScaleImage(i, iw, ih);
      if(ic)
        t.fimage = ic;
    } else {
      iw = t.iw;
      ih = t.ih;
      mscale = 1;
    }
    if(!t.HasText()) {
      if(tc.shadow) {
        ic = AddShadowToImage(t.image, iw, ih, mscale, tc.shadow, tc.shadowBlur,
          tc.shadowOffset);
        if(ic) {
          t.fimage = ic.image;
          t.w = ic.width;
          t.h = ic.height;
        }
      }
      if(tc.bgColour || tc.bgOutlineThickness) {
        bc = tc.bgColour == 'tag' ? GetProperty(t.a, 'background-color') :
          tc.bgColour;
        oc = tc.bgOutline == 'tag' ? GetProperty(t.a, 'color') : 
          (tc.bgOutline || tc.textColour);
        iw = t.fimage.width;
        ih = t.fimage.height;
        if(tc.outlineMethod == 'colour') {
          // create the outline version first, using the current image state
          ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc,
            tc.bgOutlineThickness, tc.outlineColour, tc.padding, tc.bgRadius, 1);
          if(ic)
            t.oimage = ic.image;
        }
        ic = AddBackgroundToImage(t.fimage, iw, ih, mscale, bc, 
          tc.bgOutlineThickness, oc, tc.padding, tc.bgRadius);
        if(ic) {
          t.fimage = ic.image;
          t.w = ic.width;
          t.h = ic.height;
        }
      }
      if(tc.outlineMethod == 'size') {
        if(tc.outlineIncrease > 0) {
          t.iw += 2 * tc.outlineIncrease;
          t.ih += 2 * tc.outlineIncrease;
          iw = mscale * t.iw;
          ih = mscale * t.ih;
          ic = ScaleImage(t.fimage, iw, ih);
          t.oimage = ic;
          t.fimage = ExpandImage(t.fimage, t.oimage.width, t.oimage.height);
        } else {
          iw = mscale * (t.iw + (2 * tc.outlineIncrease));
          ih = mscale * (t.ih + (2 * tc.outlineIncrease));
          ic = ScaleImage(t.fimage, iw, ih);
          t.oimage = ExpandImage(ic, t.fimage.width, t.fimage.height);
        }
      }
    }
  }
  t.Init();
}
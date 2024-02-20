function addBuilding(buffers, properties, polygon, forcedColor, colorVariance) {
    const
      dim = getDimensions(properties, getBBox(polygon[0])),
      wallColor = varyColor((forcedColor || properties.wallColor || properties.color || getMaterialColor(properties.material)), colorVariance),
      roofColor = varyColor((forcedColor || properties.roofColor || getMaterialColor(properties.roofMaterial)), colorVariance);

    //*** process buildings that don't require a roof *************************

    switch (properties.shape) {
      case 'cone':
        split.cylinder(buffers, dim.center, dim.radius, 0, dim.wallHeight, dim.wallZ, wallColor);
        return;

      case 'dome':
        split.dome(buffers, dim.center, dim.radius, dim.wallHeight, dim.wallZ, wallColor);
        return;

      case 'pyramid':
        split.pyramid(buffers, polygon, dim.center, dim.wallHeight, dim.wallZ, wallColor);
        return;

      case 'sphere':
        split.sphere(buffers, dim.center, dim.radius, dim.wallHeight, dim.wallZ, wallColor);
        return;
    }

    //*** process roofs *******************************************************

    createRoof(buffers, properties, polygon, dim, roofColor, wallColor);
    
    //*** process remaining buildings *****************************************

    switch(properties.shape) {
      case 'none':
        // no walls at all
        return;

      case 'cylinder':
        split.cylinder(buffers, dim.center, dim.radius, dim.radius, dim.wallHeight, dim.wallZ, wallColor);
        return;

      default: // extruded polygon
        let ty1 = 0.2;
        let ty2 = 0.4;
        // non-continuous windows
        if (properties.material !== 'glass') {
          ty1 = 0;
          ty2 = 0;
          if (properties.levels) {
            ty2 = (parseFloat(properties.levels) - parseFloat(properties.minLevel || 0))<<0;
          }
        }
        split.extrusion(buffers, polygon, dim.wallHeight, dim.wallZ, wallColor, [0, WINDOWS_PER_METER, ty1/dim.wallHeight, ty2/dim.wallHeight]);
    }
  }
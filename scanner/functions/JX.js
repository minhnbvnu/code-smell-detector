function JX(e,t,n){n.mapper;var r=n.property;r.setInterpolationTypeToLinear();for(var i=t.getNumberOfComponents(),o=oi.getDiagonalLength(e.getBounds())/Math.max.apply(Math,y(e.getDimensions())),a=0;a<i;a++){r.setScalarOpacityUnitDistance(a,o);var s=t.getRange(a);r.setGradientOpacityMinimumValue(a,0),r.setGradientOpacityMaximumValue(a,.05*(s[1]-s[0])),r.setShade(!0),r.setUseGradientOpacity(a,!0),r.setGradientOpacityMinimumOpacity(a,0),r.setGradientOpacityMaximumOpacity(a,1)}r.setAmbient(.2),r.setDiffuse(.7),r.setSpecular(.3),r.setSpecularPower(8)}
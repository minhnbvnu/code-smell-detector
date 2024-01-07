function checkLabel( ele, prefix ){
    var _p = ele._private;
    var th = labelThreshold;

    var prefixDash;
    if( prefix ){
      prefixDash = prefix + '-';
    } else {
      prefixDash = '';
    }

    ele.boundingBox();
    var bb = _p.labelBounds[prefix || 'main'];

    var text = ele.pstyle( prefixDash + 'label' ).value;
    var eventsEnabled = ele.pstyle( 'text-events' ).strValue === 'yes';

    if( !eventsEnabled || !text ){ return; }

    var lx = preprop( _p.rscratch, 'labelX', prefix );
    var ly = preprop( _p.rscratch, 'labelY', prefix );

    var theta = preprop( _p.rscratch, 'labelAngle', prefix );

    var ox = ele.pstyle(prefixDash + 'text-margin-x').pfValue;
    let oy = ele.pstyle(prefixDash + 'text-margin-y').pfValue;

    var lx1 = bb.x1 - th - ox; // (-ox, -oy) as bb already includes margin
    var lx2 = bb.x2 + th - ox; // and rotation is about (lx, ly)
    var ly1 = bb.y1 - th - oy;
    var ly2 = bb.y2 + th - oy;

    if( theta ){
      var cos = Math.cos( theta );
      var sin = Math.sin( theta );

      var rotate = function( x, y ){
        x = x - lx;
        y = y - ly;

        return {
          x: x * cos - y * sin + lx,
          y: x * sin + y * cos + ly
        };
      };

      var px1y1 = rotate( lx1, ly1 );
      var px1y2 = rotate( lx1, ly2 );
      var px2y1 = rotate( lx2, ly1 );
      var px2y2 = rotate( lx2, ly2 );

      var points = [ // with the margin added after the rotation is applied
        px1y1.x + ox, px1y1.y + oy,
        px2y1.x + ox, px2y1.y + oy,
        px2y2.x + ox, px2y2.y + oy,
        px1y2.x + ox, px1y2.y + oy
      ];

      if( math.pointInsidePolygonPoints( x, y, points ) ){
        addEle( ele );
        return true;
      }
    } else { // do a cheaper bb check
      if( math.inBoundingBox( bb, x, y ) ){
        addEle( ele );
        return true;
      }
    }

  }
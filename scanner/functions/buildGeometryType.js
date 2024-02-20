function buildGeometryType( primitives, sources, vertices ) {

      var build = {};

      var position = { array: [], stride: 0 };
      var normal = { array: [], stride: 0 };
      var uv = { array: [], stride: 0 };
      var uv2 = { array: [], stride: 0 };
      var color = { array: [], stride: 0 };

      var skinIndex = { array: [], stride: 4 };
      var skinWeight = { array: [], stride: 4 };

      var geometry = new THREE.BufferGeometry();

      var materialKeys = [];

      var start = 0;

      for ( var p = 0; p < primitives.length; p ++ ) {

        var primitive = primitives[ p ];
        var inputs = primitive.inputs;

        // groups

        var count = 0;

        switch ( primitive.type ) {

          case 'lines':
          case 'linestrips':
            count = primitive.count * 2;
            break;

          case 'triangles':
            count = primitive.count * 3;
            break;

          case 'polylist':

            for ( var g = 0; g < primitive.count; g ++ ) {

              var vc = primitive.vcount[ g ];

              switch ( vc ) {

                case 3:
                  count += 3; // single triangle
                  break;

                case 4:
                  count += 6; // quad, subdivided into two triangles
                  break;

                default:
                  count += ( vc - 2 ) * 3; // polylist with more than four vertices
                  break;

              }

            }

            break;

          default:
            console.warn( 'THREE.ColladaLoader: Unknow primitive type:', primitive.type );

        }

        geometry.addGroup( start, count, p );
        start += count;

        // material

        if ( primitive.material ) {

          materialKeys.push( primitive.material );

        }

        // geometry data

        for ( var name in inputs ) {

          var input = inputs[ name ];

          switch ( name ) {

            case 'VERTEX':
              for ( var key in vertices ) {

                var id = vertices[ key ];

                switch ( key ) {

                  case 'POSITION':
                    var prevLength = position.array.length;
                    buildGeometryData( primitive, sources[ id ], input.offset, position.array );
                    position.stride = sources[ id ].stride;

                    if ( sources.skinWeights && sources.skinIndices ) {

                      buildGeometryData( primitive, sources.skinIndices, input.offset, skinIndex.array );
                      buildGeometryData( primitive, sources.skinWeights, input.offset, skinWeight.array );

                    }

                    // see #3803

                    if ( primitive.hasUV === false && primitives.uvsNeedsFix === true ) {

                      var count = ( position.array.length - prevLength ) / position.stride;

                      for ( var i = 0; i < count; i ++ ) {

                        // fill missing uv coordinates

                        uv.array.push( 0, 0 );

                      }

                    }
                    break;

                  case 'NORMAL':
                    buildGeometryData( primitive, sources[ id ], input.offset, normal.array );
                    normal.stride = sources[ id ].stride;
                    break;

                  case 'COLOR':
                    buildGeometryData( primitive, sources[ id ], input.offset, color.array );
                    color.stride = sources[ id ].stride;
                    break;

                  case 'TEXCOORD':
                    buildGeometryData( primitive, sources[ id ], input.offset, uv.array );
                    uv.stride = sources[ id ].stride;
                    break;

                  case 'TEXCOORD1':
                    buildGeometryData( primitive, sources[ id ], input.offset, uv2.array );
                    uv.stride = sources[ id ].stride;
                    break;

                  default:
                    console.warn( 'THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.', key );

                }

              }
              break;

            case 'NORMAL':
              buildGeometryData( primitive, sources[ input.id ], input.offset, normal.array );
              normal.stride = sources[ input.id ].stride;
              break;

            case 'COLOR':
              buildGeometryData( primitive, sources[ input.id ], input.offset, color.array );
              color.stride = sources[ input.id ].stride;
              break;

            case 'TEXCOORD':
              buildGeometryData( primitive, sources[ input.id ], input.offset, uv.array );
              uv.stride = sources[ input.id ].stride;
              break;

            case 'TEXCOORD1':
              buildGeometryData( primitive, sources[ input.id ], input.offset, uv2.array );
              uv2.stride = sources[ input.id ].stride;
              break;

          }

        }

      }

      // build geometry

      if ( position.array.length > 0 ) geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( position.array, position.stride ) );
      if ( normal.array.length > 0 ) geometry.addAttribute( 'normal', new THREE.Float32BufferAttribute( normal.array, normal.stride ) );
      if ( color.array.length > 0 ) geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( color.array, color.stride ) );
      if ( uv.array.length > 0 ) geometry.addAttribute( 'uv', new THREE.Float32BufferAttribute( uv.array, uv.stride ) );
      if ( uv2.array.length > 0 ) geometry.addAttribute( 'uv2', new THREE.Float32BufferAttribute( uv2.array, uv2.stride ) );

      if ( skinIndex.array.length > 0 ) geometry.addAttribute( 'skinIndex', new THREE.Float32BufferAttribute( skinIndex.array, skinIndex.stride ) );
      if ( skinWeight.array.length > 0 ) geometry.addAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeight.array, skinWeight.stride ) );

      build.data = geometry;
      build.type = primitives[ 0 ].type;
      build.materialKeys = materialKeys;

      return build;

    }
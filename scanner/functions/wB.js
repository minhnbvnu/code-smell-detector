function wB(t,e){if("cartesian2d"===t.type){var n=e[0].coord,i=e[1].coord;if(n&&i&&(bB(1,n,i,t)||bB(0,n,i,t)))return!0}return hB(t,e[0])&&hB(t,e[1])}
function rotateDegree(deg) {
          degreeTurned += deg;
          imEd.imageRotateDegree += deg;

          if (imEd.imageRotateDegree === 360 || imEd.imageRotateDegree === -360) {
            imEd.imageRotateDegree = 0;
          }

          imEd._transformImage();

          if (degreeTurned === degree) {
            imEd._transformImage();
            imEd._recordTransformData();
          } else {
            setTimeout(rotateDegree, rotateSpeed, degreeStep);
          }

        }
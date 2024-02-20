function updatePreSse(camera, height, fov) {
    // sse = projected geometric error on screen plane from distance
    // We're using an approximation, assuming that the geometric error of all
    // objects is perpendicular to the camera view vector (= we always compute
    // for worst case).
    //
    //            screen plane             object
    //               |                         __
    //               |                        /  \
    //               |             geometric{|
    //  < fov angle  . } sse          error {|    |
    //               |                        \__/
    //               |
    //               |<--------------------->
    //               |        distance
    //
    //              geometric_error * screen_width      (resp. screen_height)
    //     =  ---------------------------------------
    //        2 * distance * tan (horizontal_fov / 2)   (resp. vertical_fov)
    //
    //
    // We pre-compute the preSSE (= constant part of the screen space error formula) once here

    // Note: the preSSE for the horizontal FOV is the same value
    // focal = (this.height * 0.5) / Math.tan(verticalFOV * 0.5);
    // horizontalFOV = 2 * Math.atan(this.width * 0.5 / focal);
    // horizontalPreSSE = this.width / (2.0 * Math.tan(horizontalFOV * 0.5)); (1)
    // => replacing horizontalFOV in Math.tan(horizontalFOV * 0.5)
    // Math.tan(horizontalFOV * 0.5) = Math.tan(2 * Math.atan(this.width * 0.5 / focal) * 0.5)
    //                               = Math.tan(Math.atan(this.width * 0.5 / focal))
    //                               = this.width * 0.5 / focal
    // => now replacing focal
    //                               = this.width * 0.5 / (this.height * 0.5) / Math.tan(verticalFOV * 0.5)
    //                               = Math.tan(verticalFOV * 0.5) * this.width / this.height
    // => back to (1)
    // horizontalPreSSE = this.width / (2.0 * Math.tan(verticalFOV * 0.5) * this.width / this.height)
    //                  = this.height / 2.0 * Math.tan(verticalFOV * 0.5)
    //                  = verticalPreSSE

    if (camera.camera3D.isOrthographicCamera) {
        camera._preSSE = height;
    } else {
        const verticalFOV = THREE.MathUtils.degToRad(fov);
        camera._preSSE = height / (2.0 * Math.tan(verticalFOV * 0.5));
    }
}
function setUpScene(w, h) {

        // if required to support .toDataURL():
        // {preserveDrawingBuffer   : true}
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(w, h);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, w / h, NEAR, FAR);
        camera.position.z = 160;
        scene.add(camera);

        cube1 = addCube(0, 0, 25);

        addLight(10, 50, 130);
    }
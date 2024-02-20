function beforePaint() {

        cube1.rotation.y += rotationSpeed;

        renderer.render(scene, camera);
        requestAnimationFrame(beforePaint);
    }
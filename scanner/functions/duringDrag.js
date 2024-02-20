function duringDrag(x, y) {
    switch (mode) {
      case MODE_ADD_DROPS: {
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var pointOnPlane = tracer.eye.add(ray.multiply(-tracer.eye.y / ray.y));
        water.addDrop(pointOnPlane.x, pointOnPlane.z, 0.03, 0.01);
        if (paused) {
          water.updateNormals();
          renderer.updateCaustics(water);
        }
        break;
      }
      case MODE_MOVE_SPHERE: {
        var tracer = new GL.Raytracer();
        var ray = tracer.getRayForPixel(x * ratio, y * ratio);
        var t = -planeNormal.dot(tracer.eye.subtract(prevHit)) / planeNormal.dot(ray);
        var nextHit = tracer.eye.add(ray.multiply(t));
        center = center.add(nextHit.subtract(prevHit));
        center.x = Math.max(radius - 1, Math.min(1 - radius, center.x));
        center.y = Math.max(radius - 1, Math.min(10, center.y));
        center.z = Math.max(radius - 1, Math.min(1 - radius, center.z));
        prevHit = nextHit;
        if (paused) renderer.updateCaustics(water);
        break;
      }
      case MODE_ORBIT_CAMERA: {
        angleY -= x - oldX;
        angleX -= y - oldY;
        angleX = Math.max(-89.999, Math.min(89.999, angleX));
        break;
      }
    }
    oldX = x;
    oldY = y;
    if (paused) draw();
  }
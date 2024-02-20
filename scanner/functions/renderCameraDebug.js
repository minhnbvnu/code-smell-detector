function renderCameraDebug() {
        if (state.debugCameraWindow && debugCamera) {
            const ratio = 0.25;
            const size = { x: g.width * ratio, y: g.height * ratio };
            debugCamera.aspect = size.x / size.y;
            const camera = view.camera3D;
            const coord = new Coordinates(view.referenceCrs, camera.position).as(tileLayer.extent.crs);
            const extent = view.tileLayer.info.displayed.extent;
            displayedTilesObb.setFromExtent(extent);
            displayedTilesObbHelper.visible = true;
            displayedTilesObbHelper.updateMatrixWorld(true);

            // Note Method to compute near and far...
            // const bbox = displayedTilesObb.box3D.clone().applyMatrix4(displayedTilesObb.matrixWorld);
            // const distance = bbox.distanceToPoint(view.camera3D.position);
            // console.log('distance', distance, distance + bbox.getBoundingSphere(sphere).radius * 2);

            // Compute position camera debug
            const altitudeCameraDebug = 1.5 * coord.z;
            coord.z = altitudeCameraDebug;
            coord.as(view.referenceCrs).toVector3(debugCamera.position);
            // Compute recoil camera
            camera.worldToLocal(debugCamera.position);
            debugCamera.position.z += altitudeCameraDebug;
            camera.localToWorld(debugCamera.position);
            // Compute target camera debug
            lookAtCameraDebug.copy(view.camera3D.position);
            camera.worldToLocal(lookAtCameraDebug);
            lookAtCameraDebug.z -= altitudeCameraDebug * 1.5;
            camera.localToWorld(lookAtCameraDebug);
            debugCamera.lookAt(lookAtCameraDebug);

            helper.update();

            debugCamera.updateProjectionMatrix();
            if (layerAtmosphere) {
                layerAtmosphere.object3d.visible = false;
                fogDistance = 10e10;
                for (const obj of tileLayer.level0Nodes) {
                    obj.traverseVisible(updateFogDistance);
                }
            }

            const deltaY = state.displayCharts ? Math.round(parseFloat(chartDivContainer.style.height.replace('%', '')) * g.height / 100) + 3 : 0;
            helper.visible = true;
            helper.updateMatrixWorld(true);
            r.getClearColor(clearColor);
            r.setViewport(g.width - size.x, deltaY, size.x, size.y);
            r.setScissor(g.width - size.x, deltaY, size.x, size.y);
            r.setScissorTest(true);
            r.setClearColor(backgroundChartDiv);
            r.clear();
            r.render(view.scene, debugCamera);
            r.setScissorTest(false);
            r.setClearColor(clearColor);
            r.setViewport(0, 0, g.width, g.height);

            helper.visible = false;
            displayedTilesObbHelper.visible = false;
            if (layerAtmosphere) {
                layerAtmosphere.object3d.visible = true;
            }
            if (layerAtmosphere) {
                fogDistance = layerAtmosphere.fog.distance;
                for (const obj of tileLayer.level0Nodes) {
                    obj.traverseVisible(updateFogDistance);
                }
            }
        }
    }
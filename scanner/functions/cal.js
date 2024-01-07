function cal(curPitch, pitch, out) {
            const w = this.width;
            const h = this.height;
            const fov = this.getFov() * Math.PI / 180;
            // const worldMatrix = this._getCameraWorldMatrix(
            //     pitch, this.getBearing(),
            //     cameraLookAt, cameraPosition, cameraUp, cameraForward, cameraWorldMatrix
            // );

            // get field of view
            let farZ = this._getCameraFar(fov, pitch);
            const cameraCenterDistance = this.cameraCenterDistance;
            farZ = cameraCenterDistance + (farZ - cameraCenterDistance) / Math.cos((90 - pitch) * Math.PI / 180) * Math.cos((90 - curPitch) * Math.PI / 180);

            // camera projection matrix
            mat4.perspective(projMatrix, fov, w / h, 0.1, farZ);
            // view matrix
            // mat4.invert(viewMatrix, worldMatrix);
            const viewMatrix = this.viewMatrix;
            // matrix for world point => screen point
            return mat4.multiply(out, projMatrix, viewMatrix);
        }
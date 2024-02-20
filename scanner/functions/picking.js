function picking(event) {
        const selectNode = selectTileAt(view, event, false);
        if (selectNode) {
            circle.style.display = 'table-cell';
            centerNode.copy(selectNode.boundingSphere.center).applyMatrix4(selectNode.matrixWorld);
            const project = centerNode.project(view.camera3D);
            const coords = view.normalizedToViewCoords(project);
            const size = selectNode.screenSize;

            if (actualNode != selectNode) {
                const actualSize = Number(circle.style.width.replace('px', ''));
                actualNode = selectNode;
                removeAnimationRequester();
                new TWEEN.Tween({ size: actualSize })
                    .to({ size }, 500)
                    .easing(TWEEN.Easing.Sinusoidal.In)
                    .easing(TWEEN.Easing.Exponential.Out)
                    .onUpdate((object) => {
                        circle.style['line-height'] = `${object.size}px`;
                        circle.style.width = `${object.size}px`;
                        circle.style.height = `${object.size}px`;
                        circle.innerHTML = `${Math.floor(object.size)} px`;
                        circle.style.left = `${coords.x - object.size  * 0.5}px`;
                        circle.style.top = `${coords.y - object.size * 0.5}px`;
                    })
                    .onComplete(removeAnimationRequester)
                    .start();

                view.addFrameRequester(MAIN_LOOP_EVENTS.BEFORE_RENDER, animationFrameRequester);
            }
        } else {
            circle.style.display = 'none';
        }
    }
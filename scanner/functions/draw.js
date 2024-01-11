function draw(update = true) {
		ctx.resetTransform(); // in case there is an error, don't flip constantly back and forth due to mirroring
		ctx.clearRect(0, 0, canvas.width, canvas.height); // in case there's no footage
		ctx.save();
		ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		currentCameraImageData = imageData;

		if (mirror) {
			ctx.translate(canvas.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(cameraVideo, 0, 0, canvas.width, canvas.height);
		}

		if (!mainOops) {
			return;
		}

		if (update) {
			if (clmTrackingStarted) {
				if (useClmTracking || showClmTracking) {
					try {
						clmTracker.track(cameraVideo);
					} catch (error) {
						console.warn("Error in clmTracker.track()", error);
						if (clmTracker.getCurrentParameters().includes(NaN)) {
							console.warn("NaNs creeped in.");
						}
					}
					face = clmTracker.getCurrentPosition();
					faceScore = clmTracker.getScore();
					faceConvergence = Math.pow(clmTracker.getConvergence(), 0.5);
				}
				if (facemeshLoaded && !facemeshEstimating) {
					facemeshEstimating = true;
					// movementXSinceFacemeshUpdate = 0;
					// movementYSinceFacemeshUpdate = 0;
					cameraFramesSinceFacemeshUpdate = [];
					// If I switch virtual console desktop sessions in Ubuntu with Ctrl+Alt+F1 (and back with Ctrl+Alt+F2),
					// WebGL context is lost, which breaks facemesh (and clmTracker if useWebGL is not false)
					// Error: Size(8192) must match the product of shape 0, 0, 0
					//     at inferFromImplicitShape (tf.js:14142)
					//     at Object.reshape$3 [as kernelFunc] (tf.js:110368)
					//     at kernelFunc (tf.js:17241)
					//     at tf.js:17334
					//     at Engine.scopedRun (tf.js:17094)
					//     at Engine.runKernelFunc (tf.js:17328)
					//     at Engine.runKernel (tf.js:17171)
					//     at reshape_ (tf.js:25875)
					//     at reshape__op (tf.js:18348)
					//     at executeOp (tf.js:85396)
					// WebGL: CONTEXT_LOST_WEBGL: loseContext: context lost

					// Note that the first estimation from facemesh often takes a while,
					// and we don't want to continuously terminate the worker as it's working on those first results.
					// And also, for the first estimate it hasn't actually disabled clmtracker yet, so it's fine if it's a long timeout.
					clearTimeout(fallbackTimeoutID);
					fallbackTimeoutID = setTimeout(() => {
						if (!useClmTracking) {
							reset();
							clmTracker.init();
							clmTracker.reset();
							clmTracker.initFaceDetector(cameraVideo);
							clmTrackingStarted = true;
							console.warn("Falling back to clmtracker");
						}
						// If you've switched desktop sessions, it will presuably fail to get a new webgl context until you've switched back
						// Is this setInterval useful, vs just starting the worker?
						// It probably has a faster cycle, with the code as it is now, but maybe not inherently.
						// TODO: do the extra getContext() calls add to a GPU process crash limit
						// that makes it only able to recover a couple times (outside the electron app)?
						// For electron, I set chromium flag --disable-gpu-process-crash-limit so it can recover unlimited times.
						// TODO: there's still the case of WebGL backend failing to initialize NOT due to the process crash limit,
						// where it'd be good to have it try again (maybe with exponential falloff?)
						// (I think I can move my fallbackTimeout code into/around `initFacemeshWorker` and `facemeshEstimateFaces`)

						// Note: clearTimeout/clearInterval work interchangably
						fallbackTimeoutID = setInterval(() => {
							try {
								// Once we can create a webgl2 canvas...
								document.createElement("canvas").getContext("webgl2");
								clearInterval(fallbackTimeoutID);
								// It's worth trying to re-initialize...
								setTimeout(() => {
									console.warn("Re-initializing facemesh worker");
									initFacemeshWorker();
									facemeshRejectNext = 1; // or more?
								}, 1000);
							} catch (e) { }
						}, 500);
					}, facemeshFirstEstimation ? 20000 : 2000);
					facemeshEstimateFaces().then((predictions) => {
						facemeshEstimating = false;
						facemeshFirstEstimation = false;

						facemeshRejectNext -= 1;
						if (facemeshRejectNext > 0) {
							return;
						}

						facemeshPrediction = predictions[0]; // undefined if no faces found

						useClmTracking = false;
						showClmTracking = false;
						clearTimeout(fallbackTimeoutID);

						if (!facemeshPrediction) {
							return;
						}
						// this applies to facemeshPrediction.annotations as well, which references the same points
						// facemeshPrediction.scaledMesh.forEach((point) => {
						// 	point[0] /= frameScaleForWorker;
						// 	point[1] /= frameScaleForWorker;
						// });

						// time travel latency compensation
						// keep a history of camera frames since the prediciton was requested,
						// and analyze optical flow of new points over that history

						// mainOops.filterPoints(() => false); // for DEBUG, empty points (could probably also just set pointCount = 0;

						workerSyncedOops.filterPoints(() => false); // empty points (could probably also just set pointCount = 0;

						const { annotations } = facemeshPrediction;
						// nostrils
						workerSyncedOops.addPoint(annotations.noseLeftCorner[0][0], annotations.noseLeftCorner[0][1]);
						workerSyncedOops.addPoint(annotations.noseRightCorner[0][0], annotations.noseRightCorner[0][1]);
						// midway between eyes
						workerSyncedOops.addPoint(annotations.midwayBetweenEyes[0][0], annotations.midwayBetweenEyes[0][1]);
						// inner eye corners
						// workerSyncedOops.addPoint(annotations.leftEyeLower0[8][0], annotations.leftEyeLower0[8][1]);
						// workerSyncedOops.addPoint(annotations.rightEyeLower0[8][0], annotations.rightEyeLower0[8][1]);

						// console.log(workerSyncedOops.pointCount, cameraFramesSinceFacemeshUpdate.length, workerSyncedOops.curXY);
						if (enableTimeTravel) {
							debugFramesCtx.clearRect(0, 0, debugFramesCanvas.width, debugFramesCanvas.height);
							setTimeout(() => {
								debugPointsCtx.clearRect(0, 0, debugPointsCanvas.width, debugPointsCanvas.height);
							}, 900)
							cameraFramesSinceFacemeshUpdate.forEach((imageData, index) => {
								if (debugTimeTravel) {
									debugFramesCtx.save();
									debugFramesCtx.globalAlpha = 0.1;
									// debugFramesCtx.globalCompositeOperation = index % 2 === 0 ? "xor" : "xor";
									frameCtx.putImageData(imageData, 0, 0);
									// debugFramesCtx.putImageData(imageData, 0, 0);
									debugFramesCtx.drawImage(frameCanvas, 0, 0, canvas.width, canvas.height);
									debugFramesCtx.restore();
									debugPointsCtx.fillStyle = "aqua";
									workerSyncedOops.draw(debugPointsCtx);
								}
								workerSyncedOops.update(imageData);
							});
						}

						// Bring points from workerSyncedOops to realtime mainOops
						for (var pointIndex = 0; pointIndex < workerSyncedOops.pointCount; pointIndex++) {
							const pointOffset = pointIndex * 2;
							maybeAddPoint(mainOops, workerSyncedOops.curXY[pointOffset], workerSyncedOops.curXY[pointOffset + 1]);
						}
						// Don't do this! It's not how this is supposed to work.
						// mainOops.pointCount = workerSyncedOops.pointCount;
						// for (var pointIndex = 0; pointIndex < workerSyncedOops.pointCount; pointIndex++) {
						// 	const pointOffset = pointIndex * 2;
						// 	mainOops.curXY[pointOffset] = workerSyncedOops.curXY[pointOffset];
						// 	mainOops.curXY[pointOffset+1] = workerSyncedOops.curXY[pointOffset+1];
						// 	mainOops.prevXY[pointOffset] = workerSyncedOops.prevXY[pointOffset];
						// 	mainOops.prevXY[pointOffset+1] = workerSyncedOops.prevXY[pointOffset+1];
						// }

						// naive latency compensation
						// Note: this applies to facemeshPrediction.annotations as well which references the same point objects
						// Note: This latency compensation only really works if it's already tracking well
						// if (prevFaceInViewConfidence > 0.99) {
						// 	facemeshPrediction.scaledMesh.forEach((point) => {
						// 		point[0] += movementXSinceFacemeshUpdate;
						// 		point[1] += movementYSinceFacemeshUpdate;
						// 	});
						// }

						pointsBasedOnFaceInViewConfidence = facemeshPrediction.faceInViewConfidence;

						// TODO: separate confidence threshold for removing vs adding points?

						// cull points to those within useful facial region
						// TODO: use time travel for this too, probably! with a history of the points
						// a complexity would be that points can be removed over time and we need to keep them identified
						mainOops.filterPoints((pointIndex) => {
							var pointOffset = pointIndex * 2;
							// distance from tip of nose (stretched so make an ellipse taller than wide)
							var distance = Math.hypot(
								(annotations.noseTip[0][0] - mainOops.curXY[pointOffset]) * 1.4,
								annotations.noseTip[0][1] - mainOops.curXY[pointOffset + 1]
							);
							var headSize = Math.hypot(
								annotations.leftCheek[0][0] - annotations.rightCheek[0][0],
								annotations.leftCheek[0][1] - annotations.rightCheek[0][1]
							);
							if (distance > headSize) {
								return false;
							}
							// Avoid blinking eyes affecting pointer position.
							// distance to outer corners of eyes
							distance = Math.min(
								Math.hypot(
									annotations.leftEyeLower0[0][0] - mainOops.curXY[pointOffset],
									annotations.leftEyeLower0[0][1] - mainOops.curXY[pointOffset + 1]
								),
								Math.hypot(
									annotations.rightEyeLower0[0][0] - mainOops.curXY[pointOffset],
									annotations.rightEyeLower0[0][1] - mainOops.curXY[pointOffset + 1]
								),
							);
							if (distance < headSize * 0.42) {
								return false;
							}
							return true;
						});
					}, () => {
						facemeshEstimating = false;
						facemeshFirstEstimation = false;
					});
				}
			}
			mainOops.update(imageData);
		}

		if (facemeshPrediction) {
			ctx.fillStyle = "red";

			const bad = facemeshPrediction.faceInViewConfidence < faceInViewConfidenceThreshold;
			ctx.fillStyle = bad ? 'rgb(255,255,0)' : 'rgb(130,255,50)';
			if (!bad || mainOops.pointCount < 3 || facemeshPrediction.faceInViewConfidence > pointsBasedOnFaceInViewConfidence + 0.05) {
				if (bad) {
					ctx.fillStyle = 'rgba(255,0,255)';
				}
				if (update && useFacemesh) {
					// this should just be visual, since we only add/remove points based on the facemesh data when receiving it
					facemeshPrediction.scaledMesh.forEach((point) => {
						point[0] += prevMovementX;
						point[1] += prevMovementY;
					});
				}
				facemeshPrediction.scaledMesh.forEach(([x, y, z]) => {
					ctx.fillRect(x, y, 1, 1);
				});
			} else {
				if (update && useFacemesh) {
					pointsBasedOnFaceInViewConfidence -= 0.001;
				}
			}
		}

		if (face) {
			const bad = faceScore < faceScoreThreshold;
			ctx.strokeStyle = bad ? 'rgb(255,255,0)' : 'rgb(130,255,50)';
			if (!bad || mainOops.pointCount < 2 || faceScore > pointsBasedOnFaceScore + 0.05) {
				if (bad) {
					ctx.strokeStyle = 'rgba(255,0,255)';
				}
				if (update && useClmTracking) {
					pointsBasedOnFaceScore = faceScore;

					// nostrils
					maybeAddPoint(mainOops, face[42][0], face[42][1]);
					maybeAddPoint(mainOops, face[43][0], face[43][1]);
					// inner eye corners
					// maybeAddPoint(mainOops, face[25][0], face[25][1]);
					// maybeAddPoint(mainOops, face[30][0], face[30][1]);

					// TODO: separate confidence threshold for removing vs adding points?

					// cull points to those within useful facial region
					mainOops.filterPoints((pointIndex) => {
						var pointOffset = pointIndex * 2;
						// distance from tip of nose (stretched so make an ellipse taller than wide)
						var distance = Math.hypot(
							(face[62][0] - mainOops.curXY[pointOffset]) * 1.4,
							face[62][1] - mainOops.curXY[pointOffset + 1]
						);
						// distance based on outer eye corners
						var headSize = Math.hypot(
							face[23][0] - face[28][0],
							face[23][1] - face[28][1]
						);
						if (distance > headSize) {
							return false;
						}
						return true;
					});
				}
			} else {
				if (update && useClmTracking) {
					pointsBasedOnFaceScore -= 0.001;
				}
			}
			if (showClmTracking) {
				clmTracker.draw(canvas, undefined, undefined, true);
			}
		}
		if (debugTimeTravel) {
			ctx.save();
			ctx.globalAlpha = 0.8;
			ctx.drawImage(debugFramesCanvas, 0, 0);
			ctx.restore();
			ctx.drawImage(debugPointsCanvas, 0, 0);
		}
		ctx.fillStyle = "lime";
		mainOops.draw(ctx);
		debugPointsCtx.fillStyle = "green";
		mainOops.draw(debugPointsCtx);

		if (update) {
			var [movementX, movementY] = mainOops.getMovement();

			// Acceleration curves add a lot of stability,
			// letting you focus on a specific point without jitter, but still move quickly.

			// var accelerate = (delta, distance) => (delta / 10) * (distance ** 0.8);
			// var accelerate = (delta, distance) => (delta / 1) * (Math.abs(delta) ** 0.8);
			var accelerate = (delta, distance) => (delta / 1) * (Math.abs(delta * 5) ** acceleration);

			var distance = Math.hypot(movementX, movementY);
			var deltaX = accelerate(movementX * sensitivityX, distance);
			var deltaY = accelerate(movementY * sensitivityY, distance);

			if (debugAcceleration) {
				const graphWidth = 200;
				const graphHeight = 150;
				const graphMaxInput = 0.2;
				const graphMaxOutput = 0.4;
				const hilightInputRange = 0.01;
				ctx.save();
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, graphWidth, graphHeight);
				const hilightInput = movementX * sensitivityX;
				for (let x = 0; x < graphWidth; x++) {
					const input = x / graphWidth * graphMaxInput;
					const output = accelerate(input, input);
					const y = output / graphMaxOutput * graphHeight;
					// ctx.fillStyle = Math.abs(y - deltaX) < 1 ? "yellow" : "lime";
					const hilight = Math.abs(Math.abs(input) - Math.abs(hilightInput)) < hilightInputRange;
					if (hilight) {
						ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
						ctx.fillRect(x, 0, 1, graphHeight);
					}
					ctx.fillStyle = hilight ? "yellow" : "lime";
					ctx.fillRect(x, graphHeight - y, 1, y);
				}
				ctx.restore();
			}

			// This should never happen
			if (!isFinite(deltaX) || !isFinite(deltaY)) {
				return;
			}

			if (!paused) {
				const screenWidth = window.moveMouse ? screen.width : innerWidth;
				const screenHeight = window.moveMouse ? screen.height : innerHeight;

				mouseX -= deltaX * screenWidth;
				mouseY += deltaY * screenHeight;

				mouseX = Math.min(Math.max(0, mouseX), screenWidth);
				mouseY = Math.min(Math.max(0, mouseY), screenHeight);

				if (mouseNeedsInitPos) {
					// TODO: option to get preexisting mouse position instead of set it to center of screen
					mouseX = screenWidth / 2;
					mouseY = screenHeight / 2;
					mouseNeedsInitPos = false;
				}
				if (window.moveMouse) {
					window.moveMouse(~~mouseX, ~~mouseY);
					pointerEl.style.display = "none";
				} else {
					pointerEl.style.display = "";
					pointerEl.style.left = `${mouseX}px`;
					pointerEl.style.top = `${mouseY}px`;
				}
				if (TrackyMouse.onPointerMove) {
					TrackyMouse.onPointerMove(mouseX, mouseY);
				}
			}
			prevMovementX = movementX;
			prevMovementY = movementY;
			// movementXSinceFacemeshUpdate += movementX;
			// movementYSinceFacemeshUpdate += movementY;
			if (enableTimeTravel) {
				if (facemeshEstimating) {
					const imageData = getCameraImageData();
					if (imageData) {
						cameraFramesSinceFacemeshUpdate.push(imageData);
					}
					// limit this buffer size in case something goes wrong
					if (cameraFramesSinceFacemeshUpdate.length > 500) {
						// maybe just clear it entirely, because a partial buffer might not be useful
						cameraFramesSinceFacemeshUpdate.length = 0;
					}
				}
			}
		}
		ctx.restore();

		if (showDebugText) {
			ctx.save();
			ctx.fillStyle = "#fff";
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 3;
			ctx.font = "20px sans-serif";
			ctx.beginPath();
			const text3 = "Face convergence score: " + ((useFacemesh && facemeshPrediction) ? "N/A" : faceConvergence.toFixed(4));
			const text1 = "Face tracking score: " + ((useFacemesh && facemeshPrediction) ? facemeshPrediction.faceInViewConfidence : faceScore).toFixed(4);
			const text2 = "Points based on score: " + ((useFacemesh && facemeshPrediction) ? pointsBasedOnFaceInViewConfidence : pointsBasedOnFaceScore).toFixed(4);
			ctx.strokeText(text1, 50, 50);
			ctx.fillText(text1, 50, 50);
			ctx.strokeText(text2, 50, 70);
			ctx.fillText(text2, 50, 70);
			ctx.strokeText(text3, 50, 170);
			ctx.fillText(text3, 50, 170);
			ctx.fillStyle = "lime";
			ctx.fillRect(0, 150, faceConvergence, 5);
			ctx.fillRect(0, 0, faceScore * canvas.width, 5);
			ctx.restore();
		}
		stats.update();
	}
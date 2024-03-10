	const get_hover_candidate = (clientX, clientY)=> {

		if (!page_focused || !mouse_inside_page) return null;

		let target = document.elementFromPoint(clientX, clientY);
		if (!target) {
			return null;
		}
		
		let hover_candidate = {
			x: clientX,
			y: clientY,
			time: Date.now(),
		};
		
		let retargeted = false;
		for (const {from, to, withinMargin=Infinity} of eye_gaze_mode_config.retarget) {
			if (
				from instanceof Element ? from === target :
				typeof from === "function" ? from(target) :
				target.matches(from)
			) {
				const to_element =
					(to instanceof Element || to === null) ? to :
					typeof to === "function" ? to(target) :
					(target.closest(to) || target.querySelector(to));
				if (to_element === null) {
					return null;
				} else if (to_element) {
					const to_rect = to_element.getBoundingClientRect();
					if (
						hover_candidate.x > to_rect.left - withinMargin &&
						hover_candidate.y > to_rect.top - withinMargin &&
						hover_candidate.x < to_rect.right + withinMargin &&
						hover_candidate.y < to_rect.bottom + withinMargin
					) {
						target = to_element;
						hover_candidate.x = Math.min(
							to_rect.right - 1,
							Math.max(
								to_rect.left,
								hover_candidate.x,
							),
						);
						hover_candidate.y = Math.min(
							to_rect.bottom - 1,
							Math.max(
								to_rect.top,
								hover_candidate.y,
							),
						);
						retargeted = true;
					}
				}
			}
		}

		if (!retargeted) {
			target = target.closest(eye_gaze_mode_config.targets);

			if (!target) {
				return null;
			}
		}

		if (!eye_gaze_mode_config.noCenter(target)) {
			// Nudge hover previews to the center of buttons and things
			const rect = target.getBoundingClientRect();
			hover_candidate.x = rect.left + rect.width / 2;
			hover_candidate.y = rect.top + rect.height / 2;
		}
		hover_candidate.target = target;
		return hover_candidate;
	};
	const update = ()=> {
		const time = Date.now();
		recent_points = recent_points.filter((point_record)=> time < point_record.time + averaging_window_timespan);
		if (recent_points.length) {
			const latest_point = recent_points[recent_points.length - 1];
			recent_points.push({x: latest_point.x, y: latest_point.y, time});
			const average_point = average_points(recent_points);
			// debug
			// const canvas_point = to_canvas_coords({clientX: average_point.x, clientY: average_point.y});
			// ctx.fillStyle = "red";
			// ctx.fillRect(canvas_point.x, canvas_point.y, 10, 10);
			const recent_movement_amount = Math.hypot(latest_point.x - average_point.x, latest_point.y - average_point.y);

			// Invalidate in case an element pops up in front of the element you're hovering over, e.g. a submenu
			// (that use case doesn't actually work because the menu pops up before the hover_candidate exists)
			// (TODO: disable hovering to open submenus in eye gaze mode)
			// or an element occludes the center of an element you're hovering over, in which case it
			// could be confusing if it showed a dwell click indicator over a different element than it would click
			// (but TODO: just move the indicator off center in that case)
			if (hover_candidate && !gaze_dragging) {
				const apparent_hover_candidate = get_hover_candidate(hover_candidate.x, hover_candidate.y);
				const show_occluder_indicator = (occluder)=> {
					const occluder_indicator = document.createElement("div");
					const occluder_rect = occluder.getBoundingClientRect();
					const outline_width = 4;
					occluder_indicator.style.pointerEvents = "none";
					occluder_indicator.style.zIndex = 1000001;
					occluder_indicator.style.display = "block";
					occluder_indicator.style.position = "fixed";
					occluder_indicator.style.left = `${occluder_rect.left + outline_width}px`;
					occluder_indicator.style.top = `${occluder_rect.top + outline_width}px`;
					occluder_indicator.style.width = `${occluder_rect.width - outline_width * 2}px`;
					occluder_indicator.style.height = `${occluder_rect.height - outline_width * 2}px`;
					occluder_indicator.style.outline = `${outline_width}px dashed red`;
					occluder_indicator.style.boxShadow = `0 0 ${outline_width}px ${outline_width}px maroon`;
					document.body.appendChild(occluder_indicator);
					setTimeout(() => {
						occluder_indicator.remove();
					}, inactive_after_invalid_timespan * 0.5);
				};
				if (apparent_hover_candidate) {
					if (
						apparent_hover_candidate.target !== hover_candidate.target &&
						// !retargeted &&
						!eye_gaze_mode_config.isEquivalentTarget(
							apparent_hover_candidate.target, hover_candidate.target
						)
					) {
						hover_candidate = null;
						deactivate_for_at_least(inactive_after_invalid_timespan);
						show_occluder_indicator(apparent_hover_candidate.target);
					}
				} else {
					let occluder = document.elementFromPoint(hover_candidate.x, hover_candidate.y);
					hover_candidate = null;
					deactivate_for_at_least(inactive_after_invalid_timespan);
					show_occluder_indicator(occluder || document.body);
				}
			}
			
			let circle_position = latest_point;
			let circle_opacity = 0;
			let circle_radius = 0;
			if (hover_candidate) {
				circle_position = hover_candidate;
				circle_opacity = 0.4;
				circle_radius =
					(hover_candidate.time - time + hover_timespan) / hover_timespan
					* circle_radius_max;
				if (time > hover_candidate.time + hover_timespan) {
					if (pointer_active || gaze_dragging) {
						window.untrusted_gesture = true;
						hover_candidate.target.dispatchEvent(new PointerEvent("pointerup",
							Object.assign(get_event_options(hover_candidate), {
								button: 0,
								buttons: 0,
							})
						));
						window.untrusted_gesture = false;
					} else {
						pointers = []; // prevent multi-touch panning
						window.untrusted_gesture = true;
						hover_candidate.target.dispatchEvent(new PointerEvent("pointerdown",
							Object.assign(get_event_options(hover_candidate), {
								button: 0,
								buttons: 1,
							})
						));
						window.untrusted_gesture = false;
						if (eye_gaze_mode_config.shouldDrag(hover_candidate.target)) {
							gaze_dragging = hover_candidate.target;
						} else {
							window.untrusted_gesture = true;
							hover_candidate.target.dispatchEvent(new PointerEvent("pointerup",
								Object.assign(get_event_options(hover_candidate), {
									button: 0,
									buttons: 0,
								})
							));
							eye_gaze_mode_config.click(hover_candidate);
							window.untrusted_gesture = false;
						}
					}
					hover_candidate = null;
					deactivate_for_at_least(inactive_after_hovered_timespan);
				}
			}

			if (gaze_dragging) {
				dwell_indicator.classList.add("for-release");
			} else {
				dwell_indicator.classList.remove("for-release");
			}
			dwell_indicator.style.display = "";
			dwell_indicator.style.opacity = circle_opacity;
			dwell_indicator.style.transform = `scale(${circle_radius / circle_radius_max})`;
			dwell_indicator.style.left = `${circle_position.x - circle_radius_max/2}px`;
			dwell_indicator.style.top = `${circle_position.y - circle_radius_max/2}px`;

			let halo_target =
				gaze_dragging ||
				(hover_candidate || get_hover_candidate(latest_point.x, latest_point.y) || {}).target;
			
			if (halo_target && (!paused || eye_gaze_mode_config.dwellClickEvenIfPaused(halo_target))) {
				let rect = halo_target.getBoundingClientRect();
				const computed_style = getComputedStyle(halo_target);
				let ancestor = halo_target;
				let border_radius_scale = 1; // for border radius mimicry, given parents with transform: scale()
				while (ancestor instanceof HTMLElement) {
					const ancestor_computed_style = getComputedStyle(ancestor);
					if (ancestor_computed_style.transform) {
						// Collect scale transforms
						const match = ancestor_computed_style.transform.match(/(?:scale|matrix)\((\d+(?:\.\d+)?)/);
						if (match) {
							border_radius_scale *= Number(match[1]);
						}
					}
					if (ancestor_computed_style.overflow !== "visible") {
						// Clamp to visible region if in scrollable area
						// This lets you see the hover halo when scrolled to the middle of a large canvas
						const scroll_area_rect = ancestor.getBoundingClientRect();
						rect = {
							left: Math.max(rect.left, scroll_area_rect.left),
							top: Math.max(rect.top, scroll_area_rect.top),
							right: Math.min(rect.right, scroll_area_rect.right),
							bottom: Math.min(rect.bottom, scroll_area_rect.bottom),
						};
						rect.width = rect.right - rect.left;
						rect.height = rect.bottom - rect.top;
					}
					ancestor = ancestor.parentNode;
				}
				halo.style.display = "block";
				halo.style.position = "fixed";
				halo.style.left = `${rect.left}px`;
				halo.style.top = `${rect.top}px`;
				halo.style.width = `${rect.width}px`;
				halo.style.height = `${rect.height}px`;
				// shorthand properties might not work in all browsers (not tested)
				// this is so overkill...
				halo.style.borderTopRightRadius = `${parseFloat(computed_style.borderTopRightRadius) * border_radius_scale}px`;
				halo.style.borderTopLeftRadius = `${parseFloat(computed_style.borderTopLeftRadius) * border_radius_scale}px`;
				halo.style.borderBottomRightRadius = `${parseFloat(computed_style.borderBottomRightRadius) * border_radius_scale}px`;
				halo.style.borderBottomLeftRadius = `${parseFloat(computed_style.borderBottomLeftRadius) * border_radius_scale}px`;
			} else {
				halo.style.display = "none";
			}

			if (time < inactive_until_time) {
				return;
			}
			if (recent_movement_amount < 5) {
				if (!hover_candidate) {
					hover_candidate = {
						x: average_point.x,
						y: average_point.y,
						time: Date.now(),
						target: gaze_dragging || null,
					};
					if (!gaze_dragging) {
						hover_candidate = get_hover_candidate(hover_candidate.x, hover_candidate.y);
					}
					if (hover_candidate && (paused && !eye_gaze_mode_config.dwellClickEvenIfPaused(hover_candidate.target))) {
						hover_candidate = null;
					}
				}
			}
			if (recent_movement_amount > 100) {
				if (gaze_dragging) {
					window.untrusted_gesture = true;
					window.dispatchEvent(new PointerEvent("pointerup",
						Object.assign(get_event_options(average_point), {
							button: 0,
							buttons: 0,
						})
					));
					window.untrusted_gesture = false;
					pointers = []; // prevent multi-touch panning
				}
			}
			if (recent_movement_amount > 60) {
				hover_candidate = null;
			}
		}
	};
    handle_mouse_move: function(evt) {
      var $scope = this.vm.$root;
      if (!$scope.active_space) return;

      if (!$scope.editing_artifact_id) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      $scope.handle_scroll();

      var cursor = this.cursor_point_to_space(evt); // takes the raw event data and finds the mouse location in virtual space
      var dx = cursor.x - $scope.mouse_ox;
      var dy = cursor.y - $scope.mouse_oy;
      var dt = (new Date()).getTime() - this.last_mouse_move_time;
      this.last_mouse_move_time = (new Date()).getTime();

      // send cursor
      if (dx>10 || dy>10 || dt>100) {
        var name = "anonymous";
        if ($scope.logged_in) {
          name = $scope.user.nickname || $scope.user.email;
        } else {
          name = $scope.guest_nickname || "anonymous";
        }

        var cursor_msg = {
          action: "cursor",
          x: cursor.x,
          y: cursor.y,
          name: name,
          id: $scope.user._id||name
        };

        $scope.websocket_send(cursor_msg);
      }

      // side effects ftw!
      $scope.snap_ruler_x = -1000;
      $scope.snap_ruler_y = -1000;

      $scope.mouse_moved = true;

      $scope.transform_lock = evt.shiftKey;

      if ($scope.transform_lock) {
        if (this.mouse_state == "transform") {
          // lock aspect is done in transform
        } else {
          // lock axis
          if (Math.abs(dy)>Math.abs(dx)) {
            dx = 0;
          } else {
            dy = 0;
          }
        }
      }

      if (this.mouse_state == "move") {
        $scope.hide_toolbar_props();

        var snap_dx = 0;
        var snap_dy = 0;

        var selected = $scope.selected_artifacts();
        var snap_edges = this.old_selection_rect();

        if (selected.length && selected[0]._id==$scope.editing_artifact_id) {
          // bail out of moving editable artifact
          return;
        }

        if (snap_edges) {
          var mx = snap_edges.x1 + (snap_edges.x2-snap_edges.x1)/2;
          var my = snap_edges.y1 + (snap_edges.y2-snap_edges.y1)/2;
          var snapped1 = this.snap_point(snap_edges.x1 + dx, snap_edges.y1 + dy, false);
          var snapped2 = this.snap_point(snap_edges.x2 + dx, snap_edges.y2 + dy, false);
          var snapped3 = this.snap_point(mx + dx, my + dy, true);

          if (snapped3.snapx[0]>0) {
            snap_dx = mx + dx - snapped3.snapx[1];
          } else if (snapped2.snapx[0]>0) {
            snap_dx = snap_edges.x2 + dx - snapped2.snapx[1];
          } else {
            snap_dx = snap_edges.x1 + dx - snapped1.snapx[1];
          }

          if (snapped3.snapy[0]>0) {
            snap_dy = my + dy - snapped3.snapy[1];
          } else if (snapped2.snapy[0]>0) {
            snap_dy = snap_edges.y2 + dy - snapped2.snapy[1];
          } else {
            snap_dy = snap_edges.y1 + dy - snapped1.snapy[1];
          }
        }

        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          if (old_a) {
            return {
              x: old_a.x + dx - snap_dx,
              y: old_a.y + dy - snap_dy
            };
          } else {
            // deleted?
            return {};
          }
        }.bind(this));

      } else if (this.mouse_state == "transform") {
        var selected = $scope.selected_artifacts();
        var edges = this.old_selection_rect();

        if (!edges) {
          this.mouse_state = "idle";
          return;
        }

        $scope.hide_toolbar_props();

        var ew = (edges.x2-edges.x1);
        var eh = (edges.y2-edges.y1);

        var origin_x = edges.x1 + ew * $scope.transform_ox;
        var origin_y = edges.y1 + eh * $scope.transform_oy;

        // "leading point"
        var lead_x = edges.x1 + ew * (1-$scope.transform_ox) - origin_x;
        var lead_y = edges.y1 + eh * (1-$scope.transform_oy) - origin_y;

        var lead_snapped = this.snap_point(origin_x + lead_x + dx, origin_y + lead_y + dy);
        var moved_x = (lead_snapped.snapx[1] - origin_x);
        var moved_y = (lead_snapped.snapy[1] - origin_y);

        var scale_x = lead_x ? (moved_x)/lead_x : 1;
        var scale_y = lead_y ? (moved_y)/lead_y : 1;
        if ($scope.transform_lock) scale_y = scale_x;

        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          var x1 = origin_x + ((old_a.x - origin_x) * scale_x);
          var y1 = origin_y + ((old_a.y - origin_y) * scale_y);
          var x2 = origin_x + (((old_a.x + old_a.w) - origin_x) * scale_x);
          var y2 = origin_y + (((old_a.y + old_a.h) - origin_y) * scale_y);

          if (x1>x2) { var t = x1; x1 = x2; x2 = t; }
          if (y1>y2) { var t = y1; y1 = y2; y2 = t; }

          return {
            x: x1,
            y: y1,
            w: x2 - x1,
            h: y2 - y1
          };
        }.bind(this));

      } else if (this.mouse_state == "lasso") {
        this.lasso.w = dx;
        this.lasso.h = dy;

        this.render_lasso();

      } else if (this.mouse_state == "vector_transform") {
        $scope.hide_toolbar_props();

        var _this = this;
        $scope.update_selected_artifacts(function(a) {
          var old_a = $scope.find_artifact_before_transaction(a);

          var control_points = _.cloneDeep(old_a.control_points);
          var cp = control_points[$scope.selected_control_point_idx];

          var snapped = _this.snap_point(old_a.x+cp.dx+dx, old_a.y+cp.dy+dy);
          dx = snapped.snapx[1]-(old_a.x+cp.dx);
          dy = snapped.snapy[1]-(old_a.y+cp.dy);

          cp.dx += dx;
          cp.dy += dy;

          // special case for arrow's 3rd point
          if (a.shape == "arrow" && $scope.selected_control_point_idx!=2) {
            control_points[2].dx = (control_points[0].dx+control_points[1].dx)/2;
            control_points[2].dy = (control_points[0].dy+control_points[1].dy)/2;
          }

          return _this.normalize_control_points(control_points, old_a);
        }, false, true); // override_locked: false, temporary: true

      } else if (this.mouse_state == "scribble") {
        $scope.update_selected_artifacts(function(a) {
          var old_a = a;

          var control_points = _.cloneDeep(old_a.control_points);
          var offset = {x:cursor.x,y:cursor.y};

          control_points.push({
            dx: offset.x-old_a.x,
            dy: offset.y-old_a.y
          });

          return this.normalize_control_points(simplify_scribble_points(control_points), old_a);
        }.bind(this));

        var arts = $scope.selected_artifacts();

        if (arts.length) {
          $scope.update_board_artifact_viewmodel(arts[0]);
        }
      }
      else if (this.mouse_state == "pan") {
        if (!$("#space").length) return;
        el = $("#space")[0];

        el.scrollLeft -= dx*$scope.viewport_zoom;
        el.scrollTop  -= dy*$scope.viewport_zoom;

        $scope.handle_scroll();
      }
    },
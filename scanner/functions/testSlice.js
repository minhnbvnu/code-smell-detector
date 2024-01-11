async function testSlice(slice, count) {
      var meta = chart.getDatasetMeta(0);
      var point = meta.data[slice].getCenterPoint();
      var tooltipPosition = meta.data[slice].tooltipPosition();

      async function recursive(left) {
        chart.config.data.labels[slice] = chart.config.data.labels[slice] + 'XX';
        chart.update();

        await jasmine.triggerMouseEvent(chart, 'mouseout', point);
        await jasmine.triggerMouseEvent(chart, 'mousemove', point);
        var tooltip = chart.tooltip;
        expect(tooltip.dataPoints.length).toBe(1);
        expect(tooltip.x).toBeGreaterThanOrEqual(0);
        if (tooltip.width <= chart.width) {
          expect(tooltip.x + tooltip.width).toBeLessThanOrEqual(chart.width);
        }
        expect(tooltip.caretX).toBeCloseToPixel(tooltipPosition.x);
        // if tooltip is longer than chart area then all tests done
        if (left === 0) {
          throw new Error('max iterations reached');
        }
        if (tooltip.width < chart.width) {
          await recursive(left - 1);
        }
      }

      await recursive(count);
    }
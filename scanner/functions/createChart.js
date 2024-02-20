function createChart() {
        const H = props.highcharts || (
          typeof window === 'object' && window.Highcharts
        );
        const constructorType = props.constructorType || 'chart';
  
        if (!H) {
          console.warn('The "highcharts" property was not passed.');
  
        } else if (!H[constructorType]) {
          console.warn(
            'The "constructorType" property is incorrect or some ' +
              'required module is not imported.'
          );
        } else if (!props.options) {
          console.warn('The "options" property was not passed.');
  
        } else {
          // Create a chart
          chartRef.current = H[constructorType](
            containerRef.current,
            props.options,
            props.callback
          );
        }
      }
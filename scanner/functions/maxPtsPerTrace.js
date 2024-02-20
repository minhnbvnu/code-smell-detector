function maxPtsPerTrace (trace) {
  const type = trace.type || 'scatter'

  switch (type) {
    case 'scattergl':
    case 'splom':
    case 'pointcloud':
    case 'table':
      return 1e7

    case 'scatterpolargl':
    case 'heatmap':
    case 'heatmapgl':
      return 1e6

    case 'scatter3d':
    case 'surface':
      return 5e5

    case 'mesh3d':
      if ('alphahull' in trace && Number(trace.alphahull) >= 0) {
        return 1000
      } else {
        return 5e5
      }

    case 'parcoords':
      return 5e5
    case 'scattermapbox':
      return 5e5

    case 'histogram':
    case 'histogram2d':
    case 'histogram2dcontour':
      return 1e6

    case 'box':
      if (trace.boxpoints === 'all') {
        return 5e4
      } else {
        return 1e6
      }
    case 'violin':
      if (trace.points === 'all') {
        return 5e4
      } else {
        return 1e6
      }

    default:
      return 5e4
  }
}
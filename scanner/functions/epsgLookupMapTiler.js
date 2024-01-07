function epsgLookupMapTiler(key) {
  return async function (code) {
    const response = await fetch(
      `https://api.maptiler.com/coordinates/search/code:${code}.json?transformations=true&exports=true&key=${key}`,
    );
    if (!response.ok) {
      throw new Error(
        `Unexpected response from maptiler.com: ${response.status}`,
      );
    }
    return response.json().then((json) => {
      const results = json['results'];
      if (results?.length > 0) {
        const result = results.filter(
          (r) =>
            r['id']?.['authority'] === 'EPSG' && r['id']?.['code'] === code,
        )[0];
        if (result) {
          const transforms = result['transformations'];
          if (transforms?.length > 0) {
            // use default transform if it does not require grids
            const defaultTransform = result['default_transformation'];
            if (
              transforms.filter(
                (t) =>
                  t['id']?.['authority'] === defaultTransform?.['authority'] &&
                  t['id']?.['code'] === defaultTransform?.['code'] &&
                  t['grids']?.length === 0,
              ).length > 0
            ) {
              return result['exports']?.['proj4'];
            }
            // otherwise use most accurate alternative without grids
            const transform = transforms
              .filter(
                (t) =>
                  t['grids']?.length === 0 &&
                  t['target_crs']?.['authority'] === 'EPSG' &&
                  t['target_crs']?.['code'] === 4326 &&
                  t['deprecated'] === false &&
                  t['usable'] === true,
              )
              .sort((t1, t2) => t1['accuracy'] - t2['accuracy'])[0]?.[
              'exports'
            ]?.['proj4'];
            if (transform) {
              return transform;
            }
          }
          // fallback to default
          return result['exports']?.['proj4'];
        }
      }
    });
  };
}
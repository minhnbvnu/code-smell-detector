function data2VTKImageData(data) {
        const source = exports.vtkns.ImageData.newInstance({
            spacing: data.spacing,
        });
        source.setDimensions(data.dims);
        source.setOrigin(data.origin != null ? data.origin : data.dims.map((v) => v / 2));
        const dataArray = exports.vtkns.DataArray.newInstance({
            name: "scalars",
            numberOfComponents: 1,
            values: new exports.ARRAY_TYPES[data.dtype](utf8ToAB(atob(data.buffer))),
        });
        source.getPointData().setScalars(dataArray);
        return source;
    }
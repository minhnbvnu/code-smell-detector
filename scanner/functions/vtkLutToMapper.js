function vtkLutToMapper(vtk_lut) {
        //For the moment only linear colormapper are handle
        const { scale, nodes } = vtk_lut.get("scale", "nodes");
        if (scale !== exports.vtkns.ColorTransferFunction.Scale.LINEAR)
            throw "Error transfer function scale not handle";
        const x = nodes.map((a) => a.x);
        const low = Math.min(...x);
        const high = Math.max(...x);
        const vals = (0, array_1.linspace)(low, high, 255);
        const rgb = [0, 0, 0];
        const palette = vals.map((val) => {
            vtk_lut.getColor(val, rgb);
            return rgbToHex(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
        });
        return { low, high, palette };
    }
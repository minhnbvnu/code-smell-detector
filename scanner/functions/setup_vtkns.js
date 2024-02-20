function setup_vtkns() {
        if (exports.vtkns.Actor != null)
            return;
        const vtk = window.vtk;
        exports.vtkns["Actor"] = vtk.Rendering.Core.vtkActor;
        exports.vtkns["AxesActor"] = vtk.Rendering.Core.vtkAxesActor;
        exports.vtkns["Base64"] = vtk.Common.Core.vtkBase64;
        exports.vtkns["BoundingBox"] = vtk.Common.DataModel.vtkBoundingBox;
        exports.vtkns["Camera"] = vtk.Rendering.Core.vtkCamera;
        exports.vtkns["ColorTransferFunction"] = vtk.Rendering.Core.vtkColorTransferFunction;
        exports.vtkns["CubeSource"] = vtk.Filters.Sources.vtkCubeSource;
        exports.vtkns["DataAccessHelper"] = vtk.IO.Core.DataAccessHelper;
        exports.vtkns["DataArray"] = vtk.Common.Core.vtkDataArray;
        exports.vtkns["Follower"] = vtk.Rendering.Core.vtkFollower;
        exports.vtkns["FullScreenRenderWindow"] = vtk.Rendering.Misc.vtkFullScreenRenderWindow;
        exports.vtkns["Glyph3DMapper"] = vtk.Rendering.Core.vtkGlyph3DMapper;
        exports.vtkns["HttpSceneLoader"] = vtk.IO.Core.vtkHttpSceneLoader;
        exports.vtkns["ImageData"] = vtk.Common.DataModel.vtkImageData;
        exports.vtkns["ImageMapper"] = vtk.Rendering.Core.vtkImageMapper;
        exports.vtkns["ImageProperty"] = vtk.Rendering.Core.vtkImageProperty;
        exports.vtkns["ImageSlice"] = vtk.Rendering.Core.vtkImageSlice;
        exports.vtkns["InteractiveOrientationWidget"] =
            vtk.Widgets.Widgets3D.vtkInteractiveOrientationWidget;
        exports.vtkns["InteractorStyleTrackballCamera"] =
            vtk.Interaction.Style.vtkInteractorStyleTrackballCamera;
        exports.vtkns["Light"] = vtk.Rendering.Core.vtkLight;
        exports.vtkns["LineSource"] = vtk.Filters.Sources.vtkLineSource;
        exports.vtkns["LookupTable"] = vtk.Common.Core.vtkLookupTable;
        exports.vtkns["macro"] = vtk.macro;
        exports.vtkns["Mapper"] = vtk.Rendering.Core.vtkMapper;
        exports.vtkns["OpenGLRenderWindow"] = vtk.Rendering.OpenGL.vtkRenderWindow;
        exports.vtkns["OrientationMarkerWidget"] =
            vtk.Interaction.Widgets.vtkOrientationMarkerWidget;
        exports.vtkns["OutlineFilter"] = vtk.Filters.General.vtkOutlineFilter;
        exports.vtkns["PiecewiseFunction"] = vtk.Common.DataModel.vtkPiecewiseFunction;
        exports.vtkns["PixelSpaceCallbackMapper"] =
            vtk.Rendering.Core.vtkPixelSpaceCallbackMapper;
        exports.vtkns["PlaneSource"] = vtk.Filters.Sources.vtkPlaneSource;
        exports.vtkns["PointSource"] = vtk.Filters.Sources.vtkPointSource;
        exports.vtkns["PolyData"] = vtk.Common.DataModel.vtkPolyData;
        exports.vtkns["Property"] = vtk.Rendering.Core.vtkProperty;
        exports.vtkns["Renderer"] = vtk.Rendering.Core.vtkRenderer;
        exports.vtkns["RenderWindow"] = vtk.Rendering.Core.vtkRenderWindow;
        exports.vtkns["RenderWindowInteractor"] = vtk.Rendering.Core.vtkRenderWindowInteractor;
        exports.vtkns["SphereMapper"] = vtk.Rendering.Core.vtkSphereMapper;
        exports.vtkns["SynchronizableRenderWindow"] =
            vtk.Rendering.Misc.vtkSynchronizableRenderWindow;
        exports.vtkns["Texture"] = vtk.Rendering.Core.vtkTexture;
        exports.vtkns["Volume"] = vtk.Rendering.Core.vtkVolume;
        exports.vtkns["VolumeController"] = vtk.Interaction.UI.vtkVolumeController;
        exports.vtkns["VolumeMapper"] = vtk.Rendering.Core.vtkVolumeMapper;
        exports.vtkns["VolumeProperty"] = vtk.Rendering.Core.vtkVolumeProperty;
        exports.vtkns["WidgetManager"] = vtk.Widgets.Core.vtkWidgetManager;
        const { vtkObjectManager } = exports.vtkns.SynchronizableRenderWindow;
        vtkObjectManager.setTypeMapping("vtkVolumeMapper", exports.vtkns.VolumeMapper.newInstance, vtkObjectManager.oneTimeGenericUpdater);
        vtkObjectManager.setTypeMapping("vtkSmartVolumeMapper", exports.vtkns.VolumeMapper.newInstance, vtkObjectManager.oneTimeGenericUpdater);
        vtkObjectManager.setTypeMapping("vtkFollower", exports.vtkns.Follower.newInstance, vtkObjectManager.genericUpdater);
        vtkObjectManager.setTypeMapping("vtkOpenGLGlyph3DMapper", exports.vtkns.Glyph3DMapper.newInstance, vtkObjectManager.genericUpdater);
    }
function _wgpu_object_destroy(object){let o=wgpu[object];if(o){if(o["destroy"])o["destroy"]();if(o.derivedObjects)o.derivedObjects.forEach(_wgpu_object_destroy);delete wgpu[object]}}
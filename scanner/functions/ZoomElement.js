function ZoomElement(_ref50){var scale=_ref50.scale,children=_ref50.children,componentWrapperRef=Object(react__WEBPACK_IMPORTED_MODULE_51__.useRef)(null),_useState2=_slicedToArray(Object(react__WEBPACK_IMPORTED_MODULE_51__.useState)(0),2),height=_useState2[0],setHeight=_useState2[1];return Object(react__WEBPACK_IMPORTED_MODULE_51__.useEffect)((function(){componentWrapperRef.current&&setHeight(componentWrapperRef.current.getBoundingClientRect().height)}),[scale,componentWrapperRef.current]),react__WEBPACK_IMPORTED_MODULE_51___default.a.createElement(ZoomElementWrapper,{scale:scale,height:height},react__WEBPACK_IMPORTED_MODULE_51___default.a.createElement("div",{ref:componentWrapperRef,className:"innerZoomElementWrapper"},children))}
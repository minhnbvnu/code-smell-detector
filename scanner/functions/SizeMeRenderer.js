function SizeMeRenderer(props){var explicitRef=props.explicitRef,className=props.className,style=props.style,size=props.size,disablePlaceholder=props.disablePlaceholder;props.onSize;var restProps=_objectWithoutProperties(props,_excluded$1),renderPlaceholder=(null==size||null==size.width&&null==size.height)&&!disablePlaceholder,renderProps={className:className,style:style};null!=size&&(renderProps.size=size);var toRender=renderPlaceholder?React__default.default.createElement(Placeholder$1,{className:className,style:style}):React__default.default.createElement(WrappedComponent,_extends$2({},renderProps,restProps));return React__default.default.createElement(ReferenceWrapper,{ref:explicitRef},toRender)}
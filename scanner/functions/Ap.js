function Ap(t,e){this.id=ml(),this.body=t,this.defaultOptions={yAxisOrientation:"left",defaultGroup:"default",sort:!0,sampling:!0,stack:!1,graphHeight:"400px",shaded:{enabled:!1,orientation:"bottom"},style:"line",barChart:{width:50,sideBySide:!1,align:"center"},interpolation:{enabled:!0,parametrization:"centripetal",alpha:.5},drawPoints:{enabled:!0,size:6,style:"square"},dataAxis:{},legend:{},groups:{visibility:{}}},this.options=Ql.extend({},this.defaultOptions),this.dom={},this.props={},this.hammer=null,this.groups={},this.abortedGraphUpdate=!1,this.updateSVGheight=!1,this.updateSVGheightOnResize=!1,this.forceGraphUpdate=!0;var i=this;this.itemsData=null,this.groupsData=null,this.itemListeners={add:function(t,e,n){i._onAdd(e.items)},update:function(t,e,n){i._onUpdate(e.items)},remove:function(t,e,n){i._onRemove(e.items)}},this.groupListeners={add:function(t,e,n){i._onAddGroups(e.items)},update:function(t,e,n){i._onUpdateGroups(e.items)},remove:function(t,e,n){i._onRemoveGroups(e.items)}},this.items={},this.selection=[],this.lastStart=this.body.range.start,this.touchParams={},this.svgElements={},this.setOptions(e),this.groupsUsingDefaultStyles=[0],this.body.emitter.on("rangechanged",(function(){i.svg.style.left=Ql.option.asSize(-i.props.width),i.forceGraphUpdate=!0,i.redraw.call(i)})),this._create(),this.framework={svg:this.svg,svgElements:this.svgElements,options:this.options,groups:this.groups}}
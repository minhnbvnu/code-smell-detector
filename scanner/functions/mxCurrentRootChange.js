function mxCurrentRootChange(a,b){this.view=a;this.previous=this.root=b;this.isUp=null==b;if(!this.isUp)for(var c=this.view.currentRoot,d=this.view.graph.getModel();null!=c;){if(c==b){this.isUp=!0;break}c=d.getParent(c)}}
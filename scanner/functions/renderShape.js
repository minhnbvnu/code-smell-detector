function renderShape(i){return Object.keys(i).map((function(o){var u=i[o],C=(0,pr.Z)(u),_=u.description;return s.createElement("div",{key:o},s.createElement(Xn,null,o),": ",s.createElement(Yn,null,renderType(u)),C&&" — ",C,_&&" — ",_&&s.createElement(Kn,{text:_,inline:!0}))}))}
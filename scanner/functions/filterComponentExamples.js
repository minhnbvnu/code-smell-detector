function filterComponentExamples(i,o){return Object.assign({},i,{props:Object.assign({},i.props,{examples:i.props&&i.props.examples?[i.props.examples[o]]:[]})})}
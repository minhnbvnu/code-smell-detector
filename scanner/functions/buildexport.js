function buildexport(conf, data, rules, selectOptions, uploadVar, props, methods) {
  var defaultForm=`const defaultForm = {
    id: null,
    ${data}}
    `
  var query=`form: Object.assign({}, defaultForm),
    list: null,
    totalCount: 0,
    listLoading: true,
    formLoading: false,
    listQuery: {
      Filter: '',
      Sorting: '',
      SkipCount: 0,
      MaxResultCount: 10
    },
    page: 1,
    dialogFormVisible: false,
    multipleSelection: [],
    formTitle: '',
    isEdit: false,`
    
  const str = `${exportDefault}{
  
  name: '${confGlobal.formName}',
  components: { Pagination },
  directives: { permission },
  props: [],
  data () {
    return {
      rules: {
        ${rules}
      },
      ${query}
      ${uploadVar}
      ${selectOptions}
      ${props}
    }
  },
  computed: {},
  watch: {},
  created () { this.getList() },
  mounted () {},
  methods: {
    ${methods}
  }
}`
  return defaultForm + str
}
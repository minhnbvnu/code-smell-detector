function dialogWrapper(str, tableStr) {
  return `<el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="cancel()" :title="formTitle">
    ${str}
    <div slot="footer">
      <el-button size="small" type="text" @click="cancel">取消</el-button>
      <el-button size="small" v-loading="formLoading" type="primary" @click="save">确认</el-button>
    </div>
  </el-dialog>
  ${tableStr}
  `
}
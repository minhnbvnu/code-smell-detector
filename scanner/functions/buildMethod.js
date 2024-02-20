function buildMethod() {
  const list = []; const
    funs = {
      getList: `getList() {
        this.listLoading = true;
        this.listQuery.SkipCount = (this.page - 1) * this.listQuery.MaxResultCount;
        this.$axios
          .gets('${confGlobal.api}', this.listQuery)
          .then(response => {
            this.list = response.items;
            this.totalCount = response.totalCount;
            this.listLoading = false;
          });
      },`,
      fetchData:`fetchData(id) {
        this.$axios.gets('${confGlobal.api}/' + id).then(response => {
          this.form = response;
        });
      },`,
      handleFilter:`handleFilter() {
        this.page = 1;
        this.getList();
      },`,
      handleCreate:`handleCreate() {
        this.formTitle = '新增${confGlobal.displayName}';
        this.isEdit = false;
        this.dialogFormVisible = true;
      },`,
      handleDelete:`handleDelete(row) {
        var params = [];
        let alert = '';
        if (row) {
          params.push(row.id);
          alert = row.name;
        } else {
          if (this.multipleSelection.length === 0) {
            this.$message({
              message: '未选择',
              type: 'warning'
            });
            return;
          }
          this.multipleSelection.forEach(element => {
            let id = element.id;
            params.push(id);
          });
          alert = '选中项';
        }
        this.$confirm('是否删除' + alert + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios
              .posts('${confGlobal.api}/delete', params)
              .then(response => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                this.getList();
              });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },`,
      handleUpdate:`handleUpdate(row) {
        this.formTitle = '修改${confGlobal.displayName}';
        this.isEdit = true;
        if (row) {
          this.fetchData(row.id);
          this.dialogFormVisible = true;
        } else {
          if (this.multipleSelection.length != 1) {
            this.$message({
              message: '编辑必须选择单行',
              type: 'warning'
            });
            return;
          } else {
            this.fetchData(this.multipleSelection[0].id);
            this.dialogFormVisible = true;
          }
        }
      },`,
      save:`save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.formLoading = true;
            this.form.roleNames = this.checkedRole;
            if (this.isEdit) {
              this.$axios
                .posts('${confGlobal.api}/data-post' , this.form)
                .then(response => {
                  this.formLoading = false;
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                })
                .catch(() => {
                  this.formLoading = false;
                });
            } else {
              this.$axios
                .posts('${confGlobal.api}/data-post', this.form)
                .then(response => {
                  this.formLoading = false;
                  this.$notify({
                    title: '成功',
                    message: '新增成功',
                    type: 'success',
                    duration: 2000
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                })
                .catch(() => {
                  this.formLoading = false;
                });
            }
          }
        });
      },`,
      sortChange:`sortChange(data) {
        const { prop, order } = data;
        if (!prop || !order) {
          this.handleFilter();
          return;
        }
        this.listQuery.Sorting = prop + ' ' + order;
        this.handleFilter();
      },`,
      handleSelectionChange:`handleSelectionChange(val) {
        this.multipleSelection = val;
      },`,
      handleRowClick:`handleRowClick(row, column, event) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
      },`,
      cancel:`cancel() {
        this.form = Object.assign({}, defaultForm);
        this.dialogFormVisible = false;
        this.$refs.form.clearValidate();
      },`,


      // file: confGlobal.formBtns ? {
      //   submitForm: `submitForm() {
      //   this.$refs['${confGlobal.formName}'].validate(valid => {
      //     if(!valid) return
      //     // TODO 提交表单
      //   })
      // },`,
      //   resetForm: `resetForm() {
      //   this.$refs['${confGlobal.formName}'].resetFields()
      // },`
      // } : null,
      // dialog: {
      //   onOpen: 'onOpen() {},',
      //   onClose: `onClose() {
      //   this.$refs['${confGlobal.formName}'].resetFields()
      // },`,
      //   close: `close() {
      //   this.$emit('update:visible', false)
      // },`,
      //   handelConfirm: `handelConfirm() {
      //   this.$refs['${confGlobal.formName}'].validate(valid => {
      //     if(!valid) return
      //     this.close()
      //   })
      // },`
      // }
    }

  const methods = funs
  if (methods) {
    Object.keys(methods).forEach(key => {
      list.push(methods[key])
    })
  }

  return list
}
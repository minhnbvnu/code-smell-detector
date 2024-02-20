function vueTemplate(str) {
  return `<template>
    <div class="app-container">
      <div class="head-container">
        <!-- 搜索 -->
        <el-input
          v-model="listQuery.Filter"
          clearable
          size="small"
          placeholder="搜索..."
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          class="filter-item"
          size="mini"
          type="success"
          icon="el-icon-search"
          @click="handleFilter"
        >搜索</el-button>
          <el-button
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="handleCreate"
          >新增</el-button>
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleUpdate()"
          >修改</el-button>
          <el-button
            slot="reference"
            class="filter-item"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete()"
          >删除</el-button>
      </div>
      ${str}
    </div>
  </template>`
}
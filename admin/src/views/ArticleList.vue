<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/articles/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/articles')
      this.items = res.data
    },
    async remove(row) {
      console.log(row)
      this.$confirm(`是否要删除文章 "${row.title}"`,"提示", {
        confirmButtonText: "确定",
        type: "warning"
      })
      .then(async () => {
        await this.$http.delete(`/rest/articles/${row._id}`)
        this.$message({
          type: "success",
          message: "删除成功"
        })
        this.fetch()
      })
    }
  },
  created() {
    this.fetch()
  },
}
</script>

let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
   checkLogin: ipUrl + 'checkOpenId',//检查
   getTypeInfo: ipUrl + 'getTypeInfo',//获取文章类别
   addArticle: ipUrl + 'addArticle',//添加文章
   updateArticle: ipUrl + 'updateArticle', //更新文章
   getArticleList: ipUrl + 'getArticleList', //获取文章列表
   delArticle: ipUrl + 'delArticle', //删除文章
   getArticleById: ipUrl + 'getArticleById',//根据ID查找文章
   addTypeInfo: ipUrl + 'addTypeInfo',// 添加类别
   getTypeInfoById: ipUrl + 'getTypeInfoById', // 根据ID查找类别
   updateTypeInfo: ipUrl + 'updateTypeInfo',//更新类别
   delTypeInfo: ipUrl + 'delTypeInfo',//删除类别
}
export default servicePath
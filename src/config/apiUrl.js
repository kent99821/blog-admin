let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
   checkLogin: ipUrl + 'checkOpenId',//检查
   getTypeInfo: ipUrl + 'getTypeInfo',//获取文章类别
   addArticle: ipUrl + 'addArticle',//添加文章
   updateArticle: ipUrl + 'updateArticle' //更新文章
}
export default servicePath
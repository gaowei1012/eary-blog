module.exports ={
    // 已经登录了
    checkNotLogin: (ctx) => {
      if (ctx.session && ctx.session.user) {     
        ctx.redirect('/posts');
        return false;
      }
      return true;
    },
    //没有登录
    checkLogin: (ctx) => {
      if (!ctx.session || !ctx.session.user) {     
        ctx.redirect('/signin');
        return false;
      }
      return true;
    }
}

// /**
//  * 权限认证
//  */
// module.exports = {
//     checkLogin: async (ctx, next) => {
//         if (!ctx.session.user) {
//             return ctx.redirect('/posts')
//         }
//         await next()
//     },
//     checkNotLogin: async (ctx, next) => {
//         if (!ctx.session.user) {
//             return ctx.redirect('/signin')
//         }
//         await next()
//     }
// }
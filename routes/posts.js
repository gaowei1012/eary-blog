const router = require('koa-router')()
const checkNotLogin = require('./../middlewares/check').checkNotLogin
const checkLogin = require('../middlewares/check').checkLogin
const userModel = require('./../lib/mysql')
const md = require('markdown-it')

router.get('/', async (ctx, next) => {
    ctx.redirect('/posts')
})


router.get('/posts', async(ctx, next) => {
    let res,
        postsLength,
        name = decodeURIComponent(ctx.request.querystring.split('=')[1]);
    if (ctx.request.querystring) {
        console.log('ctx.request.querystring', name)
        await userModel.findDataByUser(name)
            .then(result => {
                postsLength = result.length
            })
        await userModel.findPostByUserPage(name,1)
            .then(result => {
                res = result
            })
        await ctx.render('selfPosts', {
            session: ctx.session,
            posts: res,
            postsPageLength:Math.ceil(postsLength / 10),
        })
    } else {
        await userModel.findPostByPage(1)
            .then(result => {
                console.log(result)
                res = result
            })
        await userModel.findAllPost()
            .then(result=>{
                postsLength = result.length
            })    
        await ctx.render('posts', {
            session: ctx.session,
            posts: res,
            postsLength: postsLength,
            postsPageLength: Math.ceil(postsLength / 10),
        })
    }
})

// 分页
router.post('/posts/self/page', async(ctx, next) => {
    let data = ctx.request.body
    await userModel.findPostByUserPage(data.name, data.page)
        .then(result => {
            ctx.body = result
        }).catch(() => {
            ctx.body = 'error'
        })
})


module.exports = router;
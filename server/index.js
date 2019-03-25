const Koa = require('koa')
const json = require('koa-json')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const static = require('koa-static')
const koaBodyparser = require('koa-bodyparser')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const router = koaRouter()

app.use(static(path.resolve(__dirname, '../dist')))

router.post('/api/analysisVideo', async ctx => {
  const { url } = ctx.request.body

  console.log('got url :', url)

  await new Promise(resolve => setTimeout(resolve, 3000))

  try {
    ctx.body = { errno: 0, data: [
      { id: 1, image: 'http://fe-share.ashshen.cc/npm-files/bin-test.png', video: 'http://fe-share.ashshen.cc/pcms-files/CLI-VIDEO.mp4' },
      { id: 2, image: 'http://fe-share.ashshen.cc/micro-fe/module-construct.png', video: 'http://fe-share.ashshen.cc/pcms-files/GUI-VIDEO.mp4' },     
      { id: 3, image: 'http://fe-share.ashshen.cc/micro-fe/micro-fe-construct1.png', video: 'http://fe-share.ashshen.cc/test.flv' },     
    ] }
  } catch (err) {
    ctx.body = { errno: 1 }
  }
})

router.post('/api/downloadVideo', async ctx => {
  const { list } = ctx.request.body

  console.log('got params: list :', list)

  await new Promise(resolve => setTimeout(resolve, 1000))

  try {
    ctx.body = {
      errno: 0,
      data: 'http://fe-share.ashshen.cc/pcms-files/GUI-VIDEO.mp4'
    }
  } catch (err) {
    ctx.body = { errno: 1 }
  }
})

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async function(ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.use(router.routes())

app.listen(9989)

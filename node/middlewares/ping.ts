import { json } from "co-body"

interface RequestConfig {
  pingConfig: boolean
}

export async function ping(ctx: Context, next: () => Promise<any>) {
  const { req } = ctx

  const body = await json(req) as RequestConfig

  if(body.pingConfig){
    ctx.status = 200
    ctx.body = {
      pong: true
    }
    ctx.set('Cache-Control', 'no-cache')
    return
  } else {
    await next()
  }
}

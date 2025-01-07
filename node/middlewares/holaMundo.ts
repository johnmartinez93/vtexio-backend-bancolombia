export async function holaMundo(ctx: Context, next: () => Promise<any>) {


  ctx.status = 200
  ctx.body = { message: 'Hola Mundo!' }
  ctx.set('Cache-Control', 'no-cache')

  await next()
}

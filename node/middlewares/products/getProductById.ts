export async function getProductByID(ctx: Context, next: () => Promise<any>) {
  const { catalog } = ctx.clients

  try {
    const product = await catalog.getProductById(1)

    ctx.status = 200
    ctx.body = product
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: 'Error getting product' }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

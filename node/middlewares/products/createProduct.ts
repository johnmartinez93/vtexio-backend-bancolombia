import { json } from "co-body"

export async function createProduct(ctx: Context, next: () => Promise<any>) {
  const { clients: { catalog }, req } = ctx

  const product = await json(req)

  try {
    const productResponse = await catalog.createProduct(product)

    ctx.status = 201
    ctx.body = productResponse
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: 'Error getting product' }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

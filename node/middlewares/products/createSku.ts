import { json } from "co-body"

export async function createSku(ctx: Context, next: () => Promise<any>) {
  const { clients: { catalog }, req } = ctx

  const sku = await json(req)

  try {
    const skuResponse = await catalog.createSku(sku)

    ctx.status = 201
    ctx.body = skuResponse
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: 'Error creating sku' }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

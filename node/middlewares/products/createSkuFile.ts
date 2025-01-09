import { json } from "co-body"

export async function createSkuFile(ctx: Context, next: () => Promise<any>) {
  const { clients: { catalog }, req, vtex: { route: { params } } } = ctx

  const skuFile = await json(req)
  const { skuId } = params

  try {
    const skuResponse = await catalog.createSkuFile(skuId, skuFile)

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

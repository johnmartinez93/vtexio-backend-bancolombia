import { json } from "co-body"

export async function createOrUpdatePrices(ctx: Context, next: () => Promise<any>) {
  const { req, clients: { pricing }, vtex: { route: { params } } } = ctx

  const { skuId } = params
  const body = await json(req)

  const response = await pricing.createOrUpdatePrices(skuId, body)

  ctx.status = 200
  ctx.body = response
  ctx.set('Cache-Control', 'no-cache')

  await next()
}

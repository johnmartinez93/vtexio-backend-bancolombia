import { json } from "co-body"
import { Customer } from "vtex.service-example"

export async function updateCustomer(ctx: Context, next: () => Promise<any>) {
  const { req, clients: { customer }, vtex: { route: { params } } } = ctx

  const { id } = params as { id: string }
  const body = await json(req) as Customer

  try {
    const response = await customer.update(id, body)

    ctx.status = 200
    ctx.body = response
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: error.message }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

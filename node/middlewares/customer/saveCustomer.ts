import { json } from "co-body"
import { Customer } from "vtex.service-example"


export async function saveCustomer(ctx: Context, next: () => Promise<any>) {
  const { req, clients: { customer } } = ctx

  const body = await json(req) as Customer

  try {
    const response = await customer.save(body)

    ctx.status = 201
    ctx.body = response
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: error.message }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

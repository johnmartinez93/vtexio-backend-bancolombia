import { json } from "co-body"

interface Customer {
  first_name: string
  last_name: string
  document_id: string
}

export async function updateCustomer(ctx: Context, next: () => Promise<any>) {
  const { req, clients: { masterdata } } = ctx

  // const { documentId } = params as { documentId: string }
  const body = await json(req) as Customer

  try {
    const response = await masterdata.createDocument({
      dataEntity: 'customer',
      fields: body,
      schema: '0.0.1'
    })

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

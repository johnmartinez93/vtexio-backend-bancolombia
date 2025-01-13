import { customerService } from "../../services/customerService"

export async function getCustomers(ctx: Context, next: () => Promise<any>) {
  const { vtex: { route: { params } } } = ctx

  const { documentId } = params as { documentId: string }

  try {
    let response
    if (!documentId) {
      response = await customerService(ctx).list()
    } else {
      response = await customerService(ctx).getByDocumentId(documentId)
    }

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

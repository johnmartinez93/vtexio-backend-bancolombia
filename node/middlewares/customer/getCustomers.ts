export async function getCustomers(ctx: Context, next: () => Promise<any>) {
  const { vtex: { route: { params } }, clients: { customer } } = ctx

  const { documentId } = params as { documentId: string }

  try {
    let response
    if (!documentId) {
      response = await customer.scroll({
        fields:['_all'],
      })
    } else {
      response = await customer.search({
        page: 1,
        pageSize: 1
      }, ['first_name', 'document_id'], 'createdIn DESC', `document_id=${documentId}`)
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

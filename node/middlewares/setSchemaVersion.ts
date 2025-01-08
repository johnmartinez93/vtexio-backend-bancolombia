export async function setSchemaVersion(ctx: Context, next: () => Promise<any>) {
  const { clients: { customer }, vtex: { workspace, production } } = ctx

  if (production) {
    customer.schema = '0.3.0'
  } else {
    customer.schema = `0.3.0-${workspace}`
  }

  await next()
}

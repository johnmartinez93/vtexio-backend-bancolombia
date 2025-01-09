export async function holaMundo(ctx: Context, next: () => Promise<any>) {

  const { clients: { apps } } = ctx

  const appName = process.env.VTEX_APP_ID || 'vtex.service-example@0.3.0'

  try {
    const response = await apps.getAppSettings(appName)

    ctx.status = 200
    ctx.body = response
  } catch (error) {
    // console.error(error)
  }

  ctx.set('Cache-Control', 'no-cache')

  await next()
}

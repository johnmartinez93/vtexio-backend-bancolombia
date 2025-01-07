export async function getPokemon(ctx: Context, next: () => Promise<any>) {
  const { pokeapi } = ctx.clients

  try {
    const pokemon = await pokeapi.getPokemon('ditto')

    ctx.status = 200
    ctx.body = pokemon
  } catch (error) {
    console.error(error)

    ctx.status = 400
    ctx.body = { message: 'error getting pokemon' }
  }

  ctx.set('Cache-Control', 'no-cache')
  await next()
}

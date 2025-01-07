import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class PokeApi extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://pokeapi.co/api/v2', context, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true'
      },
    })
  }

  public async getPokemon(pokemon: string): Promise<any> {
    return this.http.get(this.routes.getPokemon(pokemon), {
      metric: 'pokeapi-get-pokemon',
    })
  }

  private get routes() {
    return {
      getPokemon: (pokemon: string): string => `/pokemon/${pokemon}`,
    }
  }
}

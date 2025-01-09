import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import type { Customer } from 'vtex.service-example'

import Status from './status'
import Catalog from './catalog'
import PokeApi from './pokeapi'
import Pricing from './pricing'



// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get pokeapi() {
    return this.getOrSet('pokeapi', PokeApi)
  }

  public get customer() {
    return this.getOrSet('customer', masterDataFor<Customer>('customer'))
  }

  public get pricing() {
    return this.getOrSet('pricing', Pricing)
  }
}

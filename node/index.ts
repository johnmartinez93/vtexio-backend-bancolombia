import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'
import { holaMundo } from './middlewares/holaMundo'
import { getProductByID } from './middlewares/products/getProductById'
import { getPokemon } from './middlewares/pokemonapi/getPokemon'
import { ping } from './middlewares/ping'
import { saveCustomer } from './middlewares/customer/saveCustomer'
import { getCustomers } from './middlewares/customer/getCustomers'
import { setSchemaVersion } from './middlewares/setSchemaVersion'
import { updateCustomer } from './middlewares/customer/updateCustomer'
import { createProduct } from './middlewares/products/createProduct'
import { createSku } from './middlewares/products/createSku'
import { createSkuFile } from './middlewares/products/createSkuFile'
import { createOrUpdatePrices } from './middlewares/pricing/createOrUpdatePrice'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients,
  routes: {
    ping: method({
      POST: [ping]
    }),
    status: method({
      GET: [validate, status],
    }),
    holaMundo: method({
      GET: [holaMundo],
    }),
    products: method({
      GET: [getProductByID],
      POST: [createProduct]
    }),
    skus: method({
      POST: [createSku]
    }),
    skusFile: method({
      POST: [createSkuFile]
    }),
    pokemon: method({
      GET: [getPokemon],
    }),
    customer: method({
      POST: [setSchemaVersion, saveCustomer],
      GET: [setSchemaVersion, getCustomers],
    }),
    customerUpdate: method({
      POST: [setSchemaVersion, updateCustomer],
    }),
    pricing: method({
      POST: [setSchemaVersion, createOrUpdatePrices],
    })
  },
})

import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Catalog extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }

  public async getProductById(productId: number): Promise<any> {
    return this.http.get(this.routes.getProductById(productId.toString()), {
      metric: 'get-product-by-id',
    })
  }

  private get routes() {
    return {
      getProductById: (productId: string) => {
        return `/api/catalog/pvt/product/${productId}`
      }}
    }
}

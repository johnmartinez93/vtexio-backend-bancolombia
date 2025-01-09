import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const basePath = '/pricing/prices'

export default class Pricing extends JanusClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: context.authToken,
      },
    })
  }


  public async createOrUpdatePrices(skuId: any, skuPrice: any): Promise<any> {
    return this.http.post(this.routes.createOrUpdatePrices(skuId, 'Principal'), skuPrice, {
      metric: 'create-sku-file',
    })
  }

  private get routes() {
    return {
      createOrUpdatePrices: (itemId: string, priceTableId: string) => {
        return `${basePath}/${itemId}/fixed/${priceTableId}`
      }
    }
  }
}

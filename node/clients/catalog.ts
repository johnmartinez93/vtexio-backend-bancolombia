import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

const basePath = '/api/catalog/pvt'

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

  public async createProduct(product: any): Promise<any> {
    return this.http.post(this.routes.createProduct(), product, {
      metric: 'create-product',
    })
  }

  public async createSku(sku: any): Promise<any> {
    return this.http.post(this.routes.createSku(), sku, {
      metric: 'create-product',
    })
  }

  public async createSkuFile(skuId: any, skuFileData: any): Promise<any> {
    return this.http.post(this.routes.createSkuFile(skuId), skuFileData, {
      metric: 'create-sku-file',
    })
  }

  private get routes() {
    return {
      getProductById: (productId: string) => {
        return `${basePath}/product/${productId}`
      },
      createProduct: () => {
        return `${basePath}/product`
      },
      createSku: () => {
        return `${basePath}/stockkeepingunit`
      },
      createSkuFile: (skuId: string) => {
        return `${basePath}/stockkeepingunit/${skuId}/file`
      }
    }
  }
}

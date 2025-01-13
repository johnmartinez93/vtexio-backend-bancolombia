import { Customer } from "vtex.service-example";

export const customerService = (ctx: Context) => {
  const { clients: { customer: customerClient }, vtex: { workspace } } = ctx
  customerClient.schema = `0.3.0-${workspace}`
  return {
    save: async (customer: Customer) => customerClient.save(customer),
    list: async () => customerClient.scroll({ fields: ['_all'] }),
    getByDocumentId: async (documentId: string) => customerClient.search({
      page: 1,
      pageSize: 1
    }, ['first_name', 'document_id'], 'createdIn DESC', `document_id=${documentId}`)
  }
}

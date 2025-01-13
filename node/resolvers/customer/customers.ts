import { customerService } from "../../services/customerService"

export const customers = async (_: any, __: any, ctx: Context) => {
  const customers = await customerService(ctx).list()

  return customers.data
}

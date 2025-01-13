interface Args {
  from: number
  to: number
}

export const books = (_: any, { from, to }: Args, __: Context) => `Lista de libro desde la pagina ${from} hasta ${to}`

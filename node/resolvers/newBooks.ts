interface Args {
  book: Book
}

interface Book {
  name: string
  author: string
}

export const newBook = (_: any, { book }: Args, __: Context) => {

  return `Se acabar registra un nuevo libro llamado ${book.name} del Autor ${book.author}`
}

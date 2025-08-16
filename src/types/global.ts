export type SortValue = 'latest' | 'low' | 'high';

export type Product = {
    id: number
    name: string
    price: number
    description: string
    image: string
    variant: string[]
}

export type ProductsAction = {
  status: number
  body: string
  data: Product[]
}

export type ProductAction = {
  status: number
  body: string
  data: Product
}
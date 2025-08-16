import db from "@/lib/db"
import { Product } from '@/types/global'



export async function productsAction() {
    const result = (await db`SELECT * FROM products`) as Product[]
    return {
        status:200,
        body:'get products success',
        data:result
    }
}
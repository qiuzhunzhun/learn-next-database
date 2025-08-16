'use client'
import React from 'react'
import Image from "next/image"
import { Product } from '@/types/global'
import { ProductsTitle } from '@/lib/constants'
import { useSortStore } from '@/store'

export default function Products({ data }: { data: Product[] }) {
  const { value } = useSortStore()
  const products = [...data]

  if(value !== 'latest'){
    products.sort((a,b) => value === 'low' ? a.price - b.price : b.price - a.price)
  }
  const handleClick = (id: number) => {
    console.log(id)
  }
  return (
    <div className="flex-1">
      <h2 className="mb-8 text-4xl">{ProductsTitle}</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer" onClick={() => handleClick(product.id)}>
            <Image src={product.image} alt={product.name} width={300} height={300} style={{
              width: '100%',  // 让图片宽度适应容器
              height: 'auto', // 高度自动调整以保持比例
            }} priority />
            <div className="flex items-center justify-between mt-4">
              <h3 className="flex-2xl text-slate-700">{product.name}</h3>
              <p className="text-lg font-bold text-red-400">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

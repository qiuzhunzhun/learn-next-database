'use client'


import React, { useState } from 'react'
import { Address } from '@/types/global'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from '@/store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Checkout({ addressesData }: { addressesData: Address[] }) {
    const [selectAddress, setSelectAddress] = useState('')
    const { cartList } = useCartStore()
    return (
        <>
            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Address</h2>
                {addressesData.length === 0 ? (
                    <div className="my-2">
                        <p>Don&#39;t have a shipping address yet?</p>
                        <div className="flex text-sm items-center underline text-orange-400">
                            <Link href="/account">Add address</Link>
                            <ArrowUpRight width={18} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <Select onValueChange={setSelectAddress}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a address" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Address</SelectLabel>
                                    {addressesData.map(item => (
                                        <SelectItem key={item.id} value={item.id.toString()}>
                                            <h3 className="font-bold m-2">{item.name}</h3>
                                            <p className="mx-5">city: {item.city}</p>
                                            <p className="mx-5">address: {item.address}</p>
                                            <p className="mx-5">phone: {item.phone}</p>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>
            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Cart</h2>
                {cartList.length === 0 ? (
                    <div className="my-2">
                        <p>
                            You don&#39;t have anything in your cart. Let&#39;s change that,
                            use the link below to start browsing our products.
                        </p>
                        <div className="flex text-sm items-center underline text-orange-400">
                            <Link href="/">Start Shopping</Link>
                            <ArrowUpRight width={18} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[400px]">Item</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartList.map((cartItem, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <Image
                                                    src={cartItem.product.image}
                                                    alt={cartItem.product.name}
                                                    width={64}
                                                    height={64}
                                                    priority
                                                    style={{
                                                        width: '64px',
                                                        height: '64px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <div className="ml-4 space-y-3">
                                                    <p className="text-sm font-medium">
                                                        {cartItem.product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {cartItem.selectedVariant}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{cartItem.quantity}</TableCell>
                                        <TableCell>${cartItem.product.price}</TableCell>
                                        <TableCell className="text-right">
                                            ${cartItem.product.price * cartItem.quantity}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">
                                        ${cartList.reduce((acc,item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                )}
            </div>
            <div className="border-b py-4">
                <h2 className="text-lg leading-10 font-bold">Payment</h2>
                <p>In the process of functional construction ...</p>
            </div>
            <div className="mt-4">
                <Button disabled={!selectAddress || !cartList.length}>Cresate order</Button>
            </div>
        </>
    )
}

'use client'


import React, { useState } from 'react'
import { JwtPayload } from 'jsonwebtoken';
import { Address as AddressType } from '@/types/global'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { addAddressAction, removeAddressAction } from '@/actions/addresses'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }),
  city: z.string().min(1, { message: 'City cannot be empty' }),
  address: z.string().min(1, { message: 'Address cannot be empty' }),
  phone: z.string().min(1, { message: 'Phone cannot be empty' }),
})

export default function Adress({ authData, addressesData }: { authData: JwtPayload, addressesData: AddressType[] }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      city: '',
      address: '',
      phone: '',
    },
  })

  const handleClick = async (id: number) => {
    await removeAddressAction(id)
  }
  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    await addAddressAction(values.name, values.city, values.address, values.phone, authData.userid)
    setOpen(false)
    form.reset()
  }
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600">
            <p className="m-3">New address</p>
            <div className="absolute bottom-2 left-3">
              <Plus width={14} />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5">Add address</DialogTitle>
            <DialogDescription></DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormLabel className="w-20">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter you name" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormLabel className="w-20">City</FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter your city" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormLabel className="w-20">Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter your address" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormLabel className="w-20">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Please enter your phone" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button>Cancel</Button>
                  <Button>Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {addressesData.map(item => (
        <div key={item.id} className="border rounded-sm h-40 relative text-slate-600">
          <p className="m-3">{item.name}</p>
          <div className="text-sm ml-5">
            <p>{item.city}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
          </div>
          <div className="absolute bottom-2 left-3 flex text-xs gap-2">
            <div className="flex items-center cursor-pointer"><Edit width={14} /> Edit</div>
            <div className="flex items-center cursor-pointer" onClick={() => handleClick(item.id)}><Trash2 width={14} /> Remove</div>
          </div>
        </div>
      ))}
    </div>
  )
}

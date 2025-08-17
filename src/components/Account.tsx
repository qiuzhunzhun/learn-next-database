'use client'

import React from 'react';
import { JwtPayload } from 'jsonwebtoken';
import { Button } from '@/components/ui/button'
import { logoutAction } from '@/actions/users'
import { useRouter } from 'next/navigation'
import Adress from '@/components/Adress'
import { Address as AddressType } from '@/types/global'

export default function Account( { authData, addressesData } : { authData : JwtPayload, addressesData:AddressType[] } ) {
  const router = useRouter()
  const handleClick = async () => {
    const res = await logoutAction();
    if(res.status === 200) {
      router.refresh()
    }
  }
  return (
    <div className="container2 py-10">
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Account</h2>
        <div className="flex justify-between items-center">
          <div>
            <p>Hello: {authData.name}</p>
            <p>Signed in as: {authData.email}</p>
            <Button className='mt-[10px]' onClick={handleClick}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Addresses</h2>
        <div>
          <p>View and update your shipping addresses, you can add as many as you like.</p>
          <p>Saving your addresses will make them available during checkout.</p>
        </div>
        <Adress authData={authData} addressesData={addressesData} />
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Orders</h2>
        <div>
          <p>There is currently no order information available</p>
        </div>
      </div>
    </div>
  )
}

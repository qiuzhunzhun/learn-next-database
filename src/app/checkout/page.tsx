import React from 'react'
import { authAction } from '@/actions/users'
import { redirect } from 'next/navigation'
import { addressesAction } from '@/actions/addresses'
import Checkout from '@/components/Checkout'

export default async function Page() {
    const auth = await authAction();

    if (auth.status !== 200) {
        redirect('/account')
    }

    const addresses = await addressesAction(auth.data?.userid)
    return (
        <div>
            <div className="container2">
                <Checkout addressesData={addresses.data} />
            </div>
        </div>
    )
}

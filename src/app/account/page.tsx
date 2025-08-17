import React from 'react'
import NotAccount from '@/components/NotAccount'
import Account from '@/components/Account'
import { authAction } from '@/actions/users'
import { addressesAction } from '@/actions/addresses'

export default async function Page() {
  const auth = await authAction()
  const addresses = await addressesAction(auth.data?.userid)
  return (
    <>
      {auth.status === 200 && auth.data ? <Account authData={auth.data} addressesData={addresses.data} /> : <NotAccount />}
    </>
  )
}

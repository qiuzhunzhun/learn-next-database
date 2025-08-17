import React from 'react'
import Cart from '@/components/Cart'
import { authAction } from '@/actions/users'

export default async function Page() {
  const auth = await authAction()
  
  return (
    <div>
      <Cart status={auth.status} />
    </div>
  )
}

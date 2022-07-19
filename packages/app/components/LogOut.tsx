import React from 'react'
import { Tooltip, IconButton, CloseIcon } from 'native-base'
import { auth } from 'app/components/firebase'
import { signOut } from 'firebase/auth'

export function LogOut() {
  const getOut = () => {
    signOut(auth)
  }
  return (
    <Tooltip
      label={'SignOut'}
      placement="bottom right"
      openDelay={300}
      closeOnClick={false}
    >
      <IconButton
        position="absolute"
        top={32}
        right={8}
        onPress={getOut}
        icon={<CloseIcon />}
        accessibilityLabel="SignOut"
      />
    </Tooltip>
  )
}

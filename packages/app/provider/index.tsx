import { NavigationProvider } from './navigation'
import React, { useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { MyAuthContext } from 'app/hooks/useAuthContext';
export function Provider({ children }: { children: React.ReactNode }) {
  const [idToken, setIdToken] = useState<string>('')
  return (
    <MyAuthContext.Provider value={{ idToken, setIdToken }}>
      <NavigationProvider>
        <NativeBaseProvider>{children}</NativeBaseProvider>
      </NavigationProvider>
    </MyAuthContext.Provider>
  )
}

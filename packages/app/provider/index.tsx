import { NavigationProvider } from './navigation'
import React, { useState } from 'react'
import { NativeBaseProvider } from 'native-base'
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <NativeBaseProvider>{children}</NativeBaseProvider>
    </NavigationProvider>
  )
}

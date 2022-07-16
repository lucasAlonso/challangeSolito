import { createContext, useContext } from "react"
export type AuthContent = {
    idToken: string,
    setIdToken: (c: string) => void

}
export const MyAuthContext = createContext<AuthContent>({ idToken: '', setIdToken: () => { } })
export const useAuth = () => useContext(MyAuthContext)

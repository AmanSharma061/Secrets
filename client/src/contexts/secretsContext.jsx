import { createContext, useContext, useState } from 'react'

const SecretsContext = createContext()

export const useSecret = () => {
  return useContext(SecretsContext)
}
export const SecretsProvider = ({ children }) => {
  const [done, setDone] = useState(false)
  const [EMAIL, setEMAIL] = useState('')
  return (
    <SecretsContext.Provider value={{ done, setDone, EMAIL, setEMAIL }}>
      {children}
    </SecretsContext.Provider>
  )
}

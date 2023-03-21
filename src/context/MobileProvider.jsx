import { createContext, useState } from "react"

export const MobileContext = createContext();


const MobileProvider = ({children}) => {

    const [onMobile, setOnMobile] = useState(false)

const value = {onMobile, setOnMobile};
  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  )
}

export default MobileProvider;
import React, { createContext, useState } from 'react'

export const addData = createContext();
export const userData = createContext();
export const deleteData = createContext();
const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState();
  const [update, setupdate] = useState();
  const [deletedata, setdelete] = useState();
  return (
    <>
      <addData.Provider value={{ useradd, setUseradd }}>
        <userData.Provider value={{ update, setupdate }}>
          <deleteData.Provider value={{ deletedata, setdelete }}>
            {children}
          </deleteData.Provider>
   
        </userData.Provider>

      </addData.Provider>
    </>
  )
}

export default ContextProvider;
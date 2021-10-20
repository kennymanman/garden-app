import React, {useContext, useState} from "react"

export const AddCartContext = React.createContext()
export const AddSavedContext = React.createContext()
export const AddListedContext = React.createContext()

export function CartProvider({children}) {
 const [cart, setCart] = useState([])
 const [saved, setSaved] = useState([])
 const [listed, setListed] = useState([])




const cartContext = {

   cart,                                              //To Add Item to Cart
   updateCart: ({name, price, image, description, images, vendor}) => {
   const updatedCart = [...cart]
   updatedCart.push({ name, count:1, price, image, description, images, vendor })
   setCart(updatedCart)

    },

   removeFromCart: ({ name })=> {

    const updatedCart = cart.filter(item => item.name !== name)
    setCart(updatedCart);
  }
  };

  



  const savedContext = {
    saved,
    updateSaved: ({ name, price, image, description, images,vendor }) => {
      
      
      const updatedSaved = [...saved]
      updatedSaved.push({name, price, image, description, images, vendor})
      setSaved(updatedSaved)
    },

    removeFromSaved: ({name })=>{

    const updatedSaved = saved.filter(item => item.name !== name)
    setSaved(updatedSaved);  
    }
  };

  





  const ListedContext = {
    listed,
    updateListed: ({ name, price, image, description }) => {
      
      
      const updatedListed = [...listed]
      updatedListed.push({name, price, image, description})
      setListed(updatedListed)
    },

    removeFromListed: ({name })=>{

      const updatedListed = listed.filter(item => item.name !== name)
      setListed(updatedListed);  
      }
  };





return (
  <AddListedContext.Provider value={ListedContext}>
<AddCartContext.Provider value={cartContext}>
    <AddSavedContext.Provider value={savedContext}>
        {children}
    </AddSavedContext.Provider>
</AddCartContext.Provider>
</AddListedContext.Provider>

)

}
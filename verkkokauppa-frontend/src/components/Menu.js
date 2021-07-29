import React from 'react'

const Menu = ({ logout }) => {
  const padding = {
    paddingRight: 5
  }
  
  if (!localStorage.getItem('shop-user-token')) {
    return(
      <div className="navBar">
        <a href='/products' style={padding}>products</a>
        <a href='/login' id='login' style={padding}>login</a>
      </div>
    )
  }
  
  return(
    <div className="navBar">
      <a href='/products' style={padding}>products</a>
      <a href='/shopping-cart' style={padding}>shopping cart</a>
      <a href='/' onClick={logout}>logout</a>
    </div>
  )
}

export default Menu
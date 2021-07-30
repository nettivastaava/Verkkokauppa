import React from 'react'

const Menu = ({ logout }) => {
  const padding = {
    paddingRight: 5
  }
  
  if (!localStorage.getItem('shop-user-token')) {
    return(
      <div className="menuBar">
        <a className="menuLink" href='/products' style={padding}>products</a>
        <a className="menuLink" href='/login' id='login' style={padding}>login</a>
        <a className="menuLink" href='/register' style={padding}>register</a>
      </div>
    )
  }
  
  return(
    <div className="navBar">
      <a className="menuLink" href='/products' style={padding}>products</a>
      <a className="menuLink" href='/shopping-cart' style={padding}>shopping cart</a>
      <a className="menuLink" href='/' onClick={logout}>logout</a>
    </div>
  )
}

export default Menu
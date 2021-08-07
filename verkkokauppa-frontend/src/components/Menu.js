import React from 'react'

const Menu = ({ logout }) => {
  const padding = {
    paddingRight: 5
  }
  
  if (!localStorage.getItem('shop-user-token')) {
    return(
      <div className="menuBar">
        <a className="menuLink" href='/products' id="products" style={padding}>products</a>
        <a className="menuLink" href='/login' id='login' style={padding}>login</a>
        <a className="menuLink" href='/register' style={padding}>register</a>
      </div>
    )
  }
  
  return(
    <div className="menuBar">
      <a className="menuLinkLogged" href='/products' id="products" style={padding}>products</a>
      <a className="menuLinkLogged" href='/shopping-cart' id="cart" style={padding}>shopping cart</a>
      <a className="menuLinkLogged" href='/settings' id="settings" style={padding}>user settings</a>
      <a className="menuLinkLogged" href='/' id="logout" onClick={logout}>logout</a>
    </div>
  )
}

export default Menu
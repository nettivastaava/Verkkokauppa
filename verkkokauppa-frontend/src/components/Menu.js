import React from 'react'
import {
  Link
} from "react-router-dom"

const Menu = ({ logout, user }) => {
  const padding = {
    paddingRight: 5
  }
  
  if (!localStorage.getItem('shop-user-token')) {
    return(
      <div className="menuBar">
        <Link className="menuLink" to='/products' id="products" style={padding}>products</Link>
        <Link className="menuLink" to='/login' id='login' style={padding}>login</Link>
        <Link className="menuLink" to='/register' style={padding}>register</Link>
      </div>
    )
  }

  if (user.role === "admin") {
    return(
      <div className="menuBar">
        <Link className="menuLinkLogged" to='/products' id="products" style={padding}>products</Link>
        <Link className="menuLinkLogged" to='/shop-settings' id="shop-settings" style={padding}>manage inventory</Link>
        <Link className="menuLinkLogged" to='/settings' id="settings" style={padding}>user settings</Link>
        <Link className="menuLinkLogged" to='/' id="logout" onClick={logout}>logout</Link>
      </div>
    )
  }
  
  return(
    <div className="menuBar">
      <Link className="menuLinkLogged" to='/products' id="products" style={padding}>products</Link>
      <Link className="menuLinkLogged" to='/shopping-cart' id="cart" style={padding}>shopping cart</Link>
      <Link className="menuLinkLogged" to='/settings' id="settings" style={padding}>user settings</Link>
      <Link className="menuLinkLogged" to='/' id="logout" onClick={logout}>logout</Link>
    </div>
  )
}

export default Menu
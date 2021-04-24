import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import Comments from './Comments'
import { ME, ALL_COMMENTS, ALL_PRODUCTS, ADD_COMMENT } from '../queries'
import { checkDocument } from '@apollo/client/utilities'

const Product = ({ showProduct, shownProduct, addToCart, setError }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
  const [getMe, meResult] = useLazyQuery(ME)
  const [getComments, commentsResult] = useLazyQuery(ALL_COMMENTS)
  const [user, setUser] = useState(null)
  

  const [ createReview, result ] = useMutation(ADD_COMMENT, {  
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setError(error)
    },
  })

  const getLoggedUser = () => {    
    getMe()  
  }
  console.log('loggedUser: ', user)
  
  useEffect(() => {
    if (!showProduct || shownProduct === null || !localStorage.getItem('shop-user-token')) {
      return
    }

    setComments(shownProduct.comments) 

    const buyButton =  document.getElementById('buy-button')

    if (shownProduct.quantity < 1) {
      buyButton.disabled = true
    } else {
      buyButton.disabled = false
    }
    
  })

  useEffect(() => {    
    if (meResult.data) {    
        setUser(meResult.data.me.id)    
    }  
  }, [meResult])

  

  if (!showProduct || !shownProduct) {
    return null
  }


  if (!localStorage.getItem('shop-user-token')) {
    return (
      <div>
        <h2>{shownProduct.name}</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                price
              </th>
              <th>
                description
              </th>
              <th>
                quantity
              </th>
            </tr>
            <tr>
              <td>{shownProduct.name}</td>
              <td>{shownProduct.price}$</td>
              <td>{shownProduct.description}</td>
              <td>{shownProduct.quantity}</td>
            </tr>
          </tbody>
        </table>
        Log in to see the reviews for this product
      </div>
    )
  }
  const button = <button id='buy-button' onClick={() => addToCart(shownProduct)}>add to cart</button>

  const postReview = async (event) => {
    
    console.log('AAAAAA')
    event.preventDefault()
    const product = shownProduct.id
    
    console.log(product)

    createReview({ variables: { user, product, content } })
    setContent('')
  }

  const check = (event) => {
    event.preventDefault()
    getLoggedUser()
    
  }

  return (
    <div>
      <h2>{shownProduct.name}</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              price
            </th>
            <th>
              description
            </th>
            <th>
              quantity
            </th>
            <th></th>
          </tr>
          <tr>
            <td>{shownProduct.name}</td>
            <td>{shownProduct.price}$</td>
            <td>{shownProduct.description}</td>
            <td>{shownProduct.quantity}</td>
            <td>{button}</td>
          </tr>
        </tbody>
      </table>
      {comments.map(c =>
        <div key={c.id}>
          <div>{c.content}</div>
        </div>
      )}
      <form onSubmit={postReview}>
        <textarea value={content} onChange={({ target }) => setContent(target.value)} className="text" cols="50" rows ="5"></textarea>
        <div>
          <button type='submit'>Review this product!</button>
        </div>
      </form>
      <button onClick={check}>testi</button>
    </div>
  )
}

export default Product
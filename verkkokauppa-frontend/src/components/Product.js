import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import Comments from './Comments'
import { ME, ALL_COMMENTS, ALL_PRODUCTS, ADD_COMMENT } from '../queries'
import { checkDocument } from '@apollo/client/utilities'
import { useRouteMatch } from 'react-router'

const Product = ({ shownProduct, addToCart, setError }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
  const userData = useQuery(ME)
  const [getComments, commentsResult] = useLazyQuery(ALL_COMMENTS)
  const [user, setUser] = useState(null)

  const [ createReview, result ] = useMutation(ADD_COMMENT, {  
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setError(error)
    },
  })

  
  useEffect(() => {
    if (!shownProduct || !localStorage.getItem('shop-user-token') || !document.getElementById('buy-button')) {
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
    if (userData.data && userData.data.me) {    
      setUser(userData.data.me.id)    
    }  
  }, [userData])

  if (userData.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!shownProduct) {
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
    
    event.preventDefault()
    const product = shownProduct.id
    createReview({ variables: { user, product, content } })
    setContent('')
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
    </div>
  )
}

export default Product
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ME, ALL_PRODUCTS, ADD_COMMENT, REMOVE_COMMENT } from '../queries'
import { checkDocument } from '@apollo/client/utilities'
import { useRouteMatch } from 'react-router'
import { Table, Form, Button } from 'react-bootstrap'

const Product = ({ shownProduct, addToCart, setError }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState([])
  const [grade, setGrade] = useState(null)
  const userData = useQuery(ME)
  const [allowReview, setAllowReview] = useState(true)
  const [user, setUser] = useState(null)
  const [ createReview, result ] = useMutation(ADD_COMMENT, {  
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setError(error)
    },
  })
  const [ removeReview, removeResult ] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setError(error)
    },
  })
  useEffect(() => {
    if (!shownProduct || !localStorage.getItem('shop-user-token') || !document.getElementById('buy-button')) {
      return
    }
    console.log('kommentit ', comments)
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
      setUser(userData.data.me.username)  
    }  
  }, [userData])

  useEffect(() => {    
    if (removeResult.data) {    
      console.log('DATA ', removeResult)
    }  
  }, [removeResult])

  useEffect( async () => {
    if (userData.data && userData.data.me && shownProduct) {
      let reviewCheck =  await comments.filter(c => c.user === userData.data.me.username)  
  
      if (reviewCheck.length > 0) {
        setAllowReview(false)
      } else {
        setAllowReview(true)
      }
    }
  })

  if (userData.loading) {
    return (
      <div>loading...</div>
    )
  }

  if (!shownProduct) {
    return null
  }

  console.log('tuote ', shownProduct)
  console.log('kom', comments.length)

  if (!localStorage.getItem('shop-user-token')) {
    return (
      <div>
        <h2 className="midHeader">{shownProduct.name}</h2>
        <Table striped>
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
              <th>
                average grade
              </th>
            </tr>
            <tr>
              <td>{shownProduct.name}</td>
              <td>${shownProduct.price}</td>
              <td>{shownProduct.description}</td>
              <td>{shownProduct.quantity}</td>
              <td>{shownProduct.average_grade}</td>
            </tr>
          </tbody>
        </Table>
        Log in to see the reviews for this product
      </div>
    )
  }
  const button = <Button className="generalButton" id='buy-button' onClick={() => addToCart(shownProduct)}>add to cart</Button>

  const postReview = async (event) => {
    event.preventDefault()

    const product = shownProduct.id
    createReview({ variables: { user, product, content, grade } })
    setContent('')
    setGrade(null)
  }

  const deleteReview = async (event) => {
    event.preventDefault()

    const productId = shownProduct.id
    removeReview({ variables: { productId } })
  }

  const deleteButton = () => (
    <Form onSubmit={deleteReview}>
      <div>
        <Button type="submit" className="generalButton">delete your review</Button>
      </div>
    </Form>
  )

  const reviewForm = () => (
    <Form onSubmit={postReview}>
      <h3>Review this product</h3>
      <Form.Label>Grade (1-5): </Form.Label>
      <input 
        id='grade'         
        type='number'
        min='1'
        max='5'
        size= '1'
        value={grade}
        onChange={({ target }) => setGrade(parseInt(target.value))}
      />
      <br></br>
      <textarea value={content} onChange={({ target }) => setContent(target.value)} className="text" cols="50" rows ="5"></textarea>
      <div>
        <Button className="generalButton" type='submit'>Review this product</Button>
      </div>
    </Form>
  )

  return (
    <div>
      <h2 className="midHeader">{shownProduct.name}</h2>
      <Table striped>
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
            <th>
              average grade
            </th>
            <th></th>
          </tr>
          <tr>
            <td>{shownProduct.name}</td>
            <td>${shownProduct.price}</td>
            <td>{shownProduct.description}</td>
            <td>{shownProduct.quantity}</td>
            <td>{shownProduct.average_grade}</td>
            <td>{button}</td>
          </tr>
        </tbody>
      </Table>
        {comments.map(c =>
          <div key={c.id}>
            <div>
              {c.user} gave grade {c.grade} and commented:
            </div>
            <div className="review">
              {c.content}
            </div>
            <div>
              {userData.data.me.username === c.user && deleteButton()}
            </div>
          </div>
        )}
      {allowReview !== false && reviewForm()}
    </div>
  )
}

export default Product
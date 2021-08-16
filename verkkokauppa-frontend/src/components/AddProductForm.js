import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button } from 'react-bootstrap'
import { ADD_PRODUCT, ALL_PRODUCTS } from '../queries'

const AddProductForm = ({ user, setNotification }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [description, setDescription] = useState('')
  const [ addProduct, result ] = useMutation(ADD_PRODUCT, {  
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setNotification(error)
    },
  })

  useEffect(() => {
    if (result.data) {
      setNotification('New product added successfully')
      setTimeout(() => {
        setNotification('')
      }, 10000)

      setName('')
      setPrice('')
      setQuantity('')
      setCategories([])
      setDescription('')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    addProduct({ variables: { name, price, quantity, categories, description } })
  }

  console.log(categories)
  const addCategory = (event) => {
    event.preventDefault()

    const newCategories = [
      ...categories,
      category
    ]
    setCategories(newCategories)
    setCategory('')
  }

  if (user.role !== "admin") {
    return null
  }

  return (
    <div>
      <h2>Add new product</h2>
      <Form onSubmit={addCategory}>
            <Form.Label>categories:</Form.Label>
            <Form.Control  
              className="textField"
              id='category'    
              minLength='2'     
              type='text'
              value={category}
              onChange={({ target }) => setCategory(target.value)}
            />
            <Button className="generalButton" id='add-category' type='submit'>add category</Button>
          </Form>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>Product name:</Form.Label>
          <Form.Control
            className="textField"
            minLength='2'    
            id='name'
            required
            type='text'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Label>price:</Form.Label>
          <Form.Control  
            className="textField"
            id='price'
            required         
            type='number'
            step="0.01"
            min="0"
            value={price}
            onChange={({ target }) => setPrice(parseFloat(target.value))}
          />
          <Form.Label>quantity:</Form.Label>
          <Form.Control  
            className="textField"
            required
            id='quantity'         
            type='number'
            min="0"
            value={quantity}
            onChange={({ target }) => setQuantity(parseInt(target.value))}
          />
          <Form.Label>description:</Form.Label>
          <Form.Control  
            className="textField"
            id='description'         
            type='text'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <Button className="generalButton" id='submit-form' type='submit'>submit</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

export default AddProductForm
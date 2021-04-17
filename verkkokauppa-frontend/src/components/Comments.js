import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { ADD_COMMENT, ALL_PRODUCTS, ME } from '../queries'

const Comments = ({ productToView, setError, loggedUser }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState(productToView.comments)

  const [ createReview, result ] = useMutation(ADD_COMMENT, {  
    refetchQueries: [ { query: ALL_PRODUCTS } ],
    onError: (error) => {
      setError(error)
    },
  })

  useEffect(() => {    
    setComments(productToView.comments) 
  }, [comments])


  const postReview = async (event) => {
    event.preventDefault()
    const user = loggedUser.id
    const product = productToView.id

    createReview({ variables: { user, product, content } })
    setContent('')
  }

  if (comments.length < 1 && !localStorage.getItem('shop-user-token')) {
    return(
      <div>
        This item has no reviews yet.
      </div>
    )
  } else if (!localStorage.getItem('shop-user-token')) {
    return(
      <div>
        {comments.map(c =>
              <div key={c.id}>
                  <div>{c.content}</div>
              </div>
            )}
      </div>
    )
  }

  if (comments.length < 1) {
    return(
      <div>
        This item has no reviews yet.
        <form onSubmit={postReview}>
          <textarea value={content} onChange={({ target }) => setContent(target.value)} className="text" cols="50" rows ="5"></textarea>
          <div>
            <button type='submit'>Review this product!</button>
          </div>
      </form>
      </div>
    )
  }

  return(
    <div>
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

export default Comments
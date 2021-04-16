import React, { useState, useEffect } from 'react'

const Comments = ({ comments }) => {
  if (comments.length < 1) {
    return(
      <div>
        This item has no reviews yet.
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
    </div>
  )
}

export default Comments
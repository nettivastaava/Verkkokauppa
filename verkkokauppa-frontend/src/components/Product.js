

const Product = ({ show, product }) => {
    if (!show) {
        return null
    }

    return(
        <div>
            <h2>{product.name}</h2>
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
                  <th>
                    add to/remove from cart  
                  </th>
                </tr>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td><button>+</button><button>-</button></td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}
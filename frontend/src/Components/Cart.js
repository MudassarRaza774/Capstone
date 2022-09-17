import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import HashLoader from 'react-spinners/HashLoader'
import { useNavigate } from 'react-router-dom'
import '../styles/cart.css'


//i want to see only those items which belongs to the current logged in user

function Cart({ setCartCount }) {
    const [cartItems, setCartItems] = useState('')
    const [spinner, setSpinner] = useState(false)
    const [reload, setReload] = useState(true)
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    const { userName } = user
    const navigate = useNavigate()

    const getData = async () => {
        setSpinner(true)
        const result = await fetch(`cart/items/${userName}`)
        if (result.status === 404) {
            navigate('/login')
        } else {
            const data = await result.json()
            setSpinner(false)
            setCartItems(data)
        }
    }

    useEffect(() => {
        getData()
    }, [reload])

    setCartCount(cartItems.length)

    const removeItem = (id) => {
        setSpinner(true)
        fetch(`cart/deleteItem/${id}`, {
            method: "DELETE",
        })
            .then(data => {
                setSpinner(false)
                reload ? setReload(false) : setReload(true)
            })

    }

    const emptyCart = async () => {
        setSpinner(true)
        const result = await fetch(`cart/deleteAll/${userName}`, {
            method: "DELETE"
        })
        if (result.status === 200) {
            setSpinner(false)
            reload ? setReload(false) : setReload(true)
        } else {
            alert("something gone faulty")
        }

    }
    return (
        <div>
            {
                spinner ? <HashLoader size={40} color="black" speedMultiplier={2} style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%"
                }} /> :
                    cartItems.length === 0 ? <p>You should add something to cart first</p> :
                        <div style={{ padding: "20px" }}>
                            <table style={{ width: "100%" }} >
                                <tr>
                                    <th className='data'>Picture</th>
                                    <th className='data'>Name</th>
                                    <th className='data'>Price</th>
                                    <th className='data'>Color</th>
                                    <th className='data'>Size</th>
                                    <th className='data'>Action</th>
                                </tr>
                                {
                                    cartItems.map((values, index) => {
                                        return (
                                            <tr>
                                                <td className='data'>
                                                    <img src={values.productImage[0]} alt="cloth" height='80px' width='80px' />
                                                </td>
                                                <td className='data'>
                                                    {values.productName}
                                                </td>
                                                <td className='data'>
                                                    {values.productPrice}
                                                </td>
                                                <td className='data'>
                                                    {values.color}
                                                </td>
                                                <td className='data'>
                                                    {values.size}
                                                </td>
                                                <td className='data'>
                                                    <Button id={values._id} variant='contained' size='small' onClick={(e) => removeItem(e.target.id)}>remove</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </table>
                            <div style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
                                < Button variant='contained' color='inherit' onClick={emptyCart} >Empty Cart</Button>
                            </div>
                        </div>

            }
        </div >
    )
}

export default Cart
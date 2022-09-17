import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'

function UserProfile() {
    const navigate = useNavigate()
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

    React.useEffect(() => {
        if (!loggedInUser) {
            navigate('/login')
        } else if (!Cookie.get('token')) {
            navigate('/login')
        }
    }, [])

    const { address, email, lastName, firstName, phoneNo, _id } = loggedInUser

    const deleteAccount = async () => {
        //hello i am here to delete my account
        const answer = window.confirm("Are you sure you want to delete your account")
        if (answer) {
            const result = await fetch(`user/delete/${_id}`, {
                method: "DELETE"
            })
            if (result.status === 200) {
                sessionStorage.setItem('loggedInUser', '')
                navigate('/login')
            }
        }
    }
    return (
        <div>
            <div style={{ margin: "20px" }} >
                <Typography>First Name: {firstName}</Typography>
                <Typography>Last Name: {lastName}</Typography>
                <Typography>Address: {address} </Typography>
                <Typography>Email: {email}</Typography>
                <Typography>Phone Number: {phoneNo}</Typography>
            </div>
            <div style={{ display: "flex", margin: "10px" }}>
                <Button variant='outlined' color='primary' onClick={deleteAccount}>delete my account</Button>
            </div>
        </div>
    )
}

export default UserProfile
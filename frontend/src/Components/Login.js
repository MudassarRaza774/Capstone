import React, { useState } from 'react'
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { schema } from '../validationSchema/login'
import { useFormik } from 'formik'
import HashLoader from 'react-spinners/HashLoader'


const initialData = { email: "", password: "" }
function Login({ setLoggedInUser }) {
    const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialData,
        validationSchema: schema,
        onSubmit: (value, action) => {
            action.resetForm()
            sendData(value)
        }
    })
    const sendData = async (value) => {
        setSpinner(true)
        const result = await fetch('/user/login', {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (result.status === 404 || result.status === 400 || !result) {
            setSpinner(false)
            window.alert("Invalid Credentials")
        } else {
            const userData = await result.json()
            setLoggedInUser(userData) //set the details of the user which is currentyly logged in
            setSpinner(false)
            navigate('/')
        }
    }
    return (
        <>
            {
                spinner ? <HashLoader size={40} speedMultiplier={2} color="black" style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                }} /> :
                    <div style={{ textAlign: "center", padding: "15px" }}>
                        <div style={{ marginTop: "10px", boxShadow: "0 3px 10px rgb(0 0 0/0.2)", height: "100%" }}>
                            <Box sx={{ flexGrow: 1, height: "100%" }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <img src='https://images.unsplash.com/photo-1446214814726-e6074845b4ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWVucyUyMGZhc2hpb258ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
                                            alt='men' width='55%' />
                                    </Grid>
                                    <Grid item xs={6} style={{ marginTop: "20px", paddingRight: "25px" }} >
                                        <div style={{ Top: "30%" }}>
                                            <Typography variant='h4'>Login</Typography>
                                        </div>
                                        <form onSubmit={handleSubmit} >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        id="email"
                                                        name="email"
                                                        value={values.email}
                                                        onBlur={handleBlur}
                                                        autoComplete='off'
                                                        margin='dense'
                                                        type="email"
                                                        size='small'
                                                        label="Email"
                                                        fullWidth
                                                        helperText={touched.email && errors.email ? errors.email : null}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        onChange={handleChange}
                                                        name="password"
                                                        value={values.password}
                                                        onBlur={handleBlur}
                                                        id="password"
                                                        autoComplete='off'
                                                        margin='dense'
                                                        size='small'
                                                        type="password"
                                                        label="Password"
                                                        fullWidth
                                                        helperText={touched.password && errors.password ? errors.password : null}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        sx={{ backgroundColor: "#2c2c2c" }}
                                                        margin='dense'
                                                        size='small'
                                                        variant='contained'
                                                        type='submit'
                                                        fullWidth
                                                    >Login</Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div >
            }
        </>
    )
}

export default Login
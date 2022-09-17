import React from 'react'
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { schema } from '../validationSchema/signUp';


const initalData = { firstName: "", lastName: "", userName: "", email: "", password: "", address: "", phoneNo: "" }
function Signup() {
    const navigate = useNavigate()

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initalData,
        validationSchema: schema,
        onSubmit: (value, action) => {
            submitData(value)
            action.resetForm()
        }
    })
    const submitData = async (value) => {
        console.log("hello i am called")
        const result = await fetch('user/signup', {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("result is:", result)
        if (result.status === 500 || !result) {
            window.alert("Email or username already exists")
        } else {
            navigate('/login') //redirect the page to home page 
        }
    }
    return (
        <div style={{ textAlign: "center", padding: "15px" }}>
            <div>
                <Typography variant='h4'>Sign Up</Typography>
            </div>
            <div style={{ marginTop: "20px", boxShadow: "0 3px 10px rgb(0 0 0/0.2)" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <img src='https://images.unsplash.com/photo-1594938328870-9623159c8c99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fG1lbnMlMjBmYXNoaW9ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=600&q=60'
                                alt='men' width='60%' />
                        </Grid>
                        <Grid item xs={6} style={{ marginTop: "20px", paddingRight: "25px" }} >
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id='firstName'
                                            name="firstName"
                                            value={values.firstName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            autoComplete='off'
                                            margin='dense'
                                            fullWidth
                                            size='small'
                                            label="First Name"
                                            helperText={touched.firstName && errors.firstName ? errors.firstName : null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={values.lastName}
                                            name="lastName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            id='lastName'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            label="Last Name"
                                            helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={values.userName}
                                            onChange={handleChange}
                                            name="userName"
                                            onBlur={handleBlur}
                                            id='userName'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            label="Username"
                                            helperText={touched.userName && errors.userName ? errors.userName : null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={values.email}
                                            onChange={handleChange}
                                            name="email"
                                            onBlur={handleBlur}
                                            id='email'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            helperText={touched.email && errors.email ? errors.email : null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={values.phoneNo}
                                            onChange={handleChange}
                                            name="phoneNo"
                                            onBlur={handleBlur}
                                            id='phoneNo'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            type='number'
                                            label="Mobile Number"
                                            helperText={touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            value={values.address}
                                            onChange={handleChange}
                                            name="address"
                                            onBlur={handleBlur}
                                            id='address'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            label="Address"
                                            helperText={touched.address && errors.address ? errors.address : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={values.password}
                                            onChange={handleChange}
                                            name="password"
                                            onBlur={handleBlur}
                                            id='password'
                                            autoComplete='off'
                                            margin='dense'
                                            size='small'
                                            fullWidth
                                            type="password"
                                            label="Password"
                                            helperText={touched.password && errors.password ? errors.password : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            sx={{ backgroundColor: "#2c2c2c" }}
                                            margin='dense'
                                            size='small'
                                            variant='contained'
                                            fullWidth
                                            type='submit'
                                        >Signup</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </div>

        </div >
    )
}

export default Signup
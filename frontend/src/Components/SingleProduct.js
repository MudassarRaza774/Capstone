import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookie from 'js-cookie'
import EditDialog from './EditItemDialog';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SingleProduct({ productData }) {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false)
    const navigate = useNavigate()

    if (!Cookie.get("token")) {
        navigate('/')
    }
    if (productData) {
        sessionStorage.setItem("currentProduct", JSON.stringify(productData))
    }


    const user = JSON.parse(sessionStorage.getItem("loggedInUser"))
    const { userName } = user
    const data = JSON.parse(sessionStorage.getItem("currentProduct"))

    const { name, price, stuff, color, images, size, guidelines } = data

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateItem = () => {
        setDialogOpen(true)
    }

    const dataToSend = {
        "userName": userName,
        "productName": name,
        "productPrice": price,
        "productImage": images,
        "size": size,
        color
    }

    const proImages = images.map((value) => {
        return (
            { imgPath: value }
        )
    })
    const theme = useTheme();
    const maxSteps = proImages.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const addToCart = async () => {
        //here if the user wants, the item will send to the item cart section
        const result = await fetch('cart/newItem', {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (result.status === 400 || result.status === 404) {
            window.alert("error on sending data")
        } else {
            window.alert("product added to cart successfully")
        }
    }

    const deleteProduct = () => {
        fetch(`clothes/deleteItem/${data._id}`, {
            method: "DELETE"
        })
            .then(navigate('/'))
    }
    return (
        <div style={{ padding: "20px" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} >
                    <Grid item xs={6} style={{ paddingLeft: "70px" }}>
                        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                            <Paper
                                square
                                elevation={0}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: 0,
                                    pl: 2,
                                    bgcolor: 'background.default',
                                }}
                            >
                            </Paper>
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {proImages.map((step, index) => (
                                    <div key={index}>
                                        {Math.abs(activeStep - index) <= 2 ? (
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 500,
                                                    display: 'block',
                                                    maxWidth: 400,
                                                    overflow: 'hidden',
                                                    width: '100%',
                                                }}
                                                src={step.imgPath}
                                                alt="Product Image"
                                            />
                                        ) : null}
                                    </div>
                                ))}
                            </AutoPlaySwipeableViews>
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                activeStep={activeStep}
                                nextButton={
                                    <Button
                                        size="small"
                                        onClick={handleNext}
                                        disabled={activeStep === maxSteps - 1}
                                    >

                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowLeft />
                                        ) : (
                                            <KeyboardArrowRight />
                                        )}
                                    </Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                        {theme.direction === 'rtl' ? (
                                            <KeyboardArrowRight />
                                        ) : (
                                            <KeyboardArrowLeft />
                                        )}

                                    </Button>
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h4' style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>{name} </Typography>
                        <Typography variant='body2'>This model is wearing size {size}, Model height: 6.0ft /183cm </Typography><br />
                        <Typography variant='h6' style={{ color: "red" }} >PKR {price}</Typography>
                        <Typography variant='h5'>Stuff: {stuff}</Typography>
                        <Typography variant='h6'>Color: {color}</Typography><br />
                        <Button variant='contained' color='inherit' fullWidth onClick={addToCart}  >Add to Cart</Button>
                        <br /><br />
                        <Typography variant='body1'>Composition & Care</Typography>
                        {
                            guidelines.map((value, index) => {
                                return (
                                    <div key={index}>
                                        <span>• {value}</span><br />
                                    </div>
                                )
                            })
                        }<br />
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ textAlign: "center" }}>
                                <Button fullWidth variant='outlined' onClick={updateItem} color='success'>Edit Product</Button>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: "center" }}>
                                <Button fullWidth variant='contained' color='error' onClick={handleClickOpen} >Delete Product</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to Delete this Item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteProduct} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            {
                dialogOpen ? <EditDialog setDialogOpen={setDialogOpen} /> : null
            }
        </div >
    )
}
export default SingleProduct

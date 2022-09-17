import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import { UpdateItem } from '../validationSchema/UpdateItem';
import { FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EditDialog({ setDialogOpen}) {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        handleClickOpen()
    }, [])
    const naivgate = useNavigate()
    let changeableData = JSON.parse(sessionStorage.getItem("currentProduct"))
    const imagesString = changeableData.images.toString()
    const guideLinesString = changeableData.guidelines.toString()
    changeableData = { ...changeableData, images: imagesString, guidelines: guideLinesString }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: changeableData,
        validationSchema: UpdateItem,
        onSubmit: (value, action) => {
            action.resetForm()
            const guidelines = value.guidelines.split(',')
            const images = value.images.split(',')
            value = { ...value, guidelines, images }
            handleClose()
            updateItem(value)
        }
    })

    const updateItem = (value) => {
        fetch(`clothes/updateItem/${changeableData._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        })
        naivgate('/')
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false)
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} fullWidth maxWidth="lg">
                <form onSubmit={handleSubmit} >
                    <DialogTitle>Update Item</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Product Details
                        </DialogContentText>
                        <TextField //name
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="name"
                            name="name"
                            value={values.name}
                            label="Product Name"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.name && errors.name ? errors.name : null}
                        />
                        <TextField //price
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            id="price"
                            name="price"
                            value={values.price}
                            label="Product Price"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.price && errors.price ? errors.price : null}
                        />
                        <TextField //guidelines
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            value={values.guidelines}
                            id="guidelines"
                            name="guidelines"
                            label="Guidelines"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.guidelines && errors.guidelines ? errors.guidelines : "Seperate Guidelines with commas"}
                        />
                        <TextField //color
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            value={values.color}
                            id="color"
                            name="color"
                            label="Product Color"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.color && errors.color ? errors.color : null}
                        />
                        <TextField //description
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            value={values.description}
                            id="description"
                            name="description"
                            label="Product Description"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.description && errors.description ? errors.description : null}
                        />
                        <TextField //images
                            autoComplete='off'
                            margin="dense"
                            onChange={handleChange}
                            value={values.images}
                            id="images"
                            name="images"
                            label="Product Images"
                            fullWidth
                            onBlur={handleBlur}
                            helperText={touched.images && errors.images ? errors.images : "Seperate Images with commas"}
                        />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth margin='dense'>
                                <InputLabel>Size</InputLabel>
                                <Select
                                    name='size'
                                    value={values.size}
                                    label="Size"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"XL"}>XL</MenuItem>
                                    <MenuItem value={"L"}>L</MenuItem>
                                    <MenuItem value={"S"}>S</MenuItem>
                                    <MenuItem value={"XS"}>XS</MenuItem>
                                </Select>
                                <FormHelperText>{touched.size && errors.size ? errors.size : null}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth margin='dense'>
                                <InputLabel>Stuff</InputLabel>
                                <Select
                                    name='stuff'
                                    value={values.stuff}
                                    label="Stuff"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Linen"}>Linen</MenuItem>
                                    <MenuItem value={"Cotton"}>Cotton</MenuItem>
                                    <MenuItem value={"Shafon"}>Shafon</MenuItem>
                                    <MenuItem value={"Khaddar"}>Khaddar</MenuItem>
                                </Select>
                                <FormHelperText>{touched.stuff && errors.stuff ? errors.stuff : null}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth margin='dense'>
                                <InputLabel>Catagory</InputLabel>
                                <Select
                                    name='catagory'
                                    value={values.catagory}
                                    label="Catagory"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Shirt"}>Shirt</MenuItem>
                                    <MenuItem value={"Trouser"}>Trouser</MenuItem>
                                    <MenuItem value={"Hoodie"}>Hoodie</MenuItem>
                                    <MenuItem value={"Jacket"}>Jacket</MenuItem>
                                </Select>
                                <FormHelperText>{touched.catagory && errors.catagory ? errors.catagory : null}</FormHelperText>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Update item</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
}

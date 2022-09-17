import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

export default function Sorting({ setFilterOpen, setFilterValues, doFilter }) {
    const [open, setOpen] = React.useState(false);
    const [enableButton, setEnableButton] = React.useState('false')
    const color = []
    const stuff = []
    let price = ''

    console.log("enableButton", enableButton)

    React.useEffect(() => {
        handleClickOpen()
    }, [])

    const handleSubmit = () => {

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFilterOpen(false)
        setOpen(false);
    };

    const selectColor = (event) => {
        const currentColor = event.target.value
        const index = color.indexOf(currentColor)
        if (index === -1) {
            color.push(currentColor)
        } else {
            color.splice(index, 1)
        }
    }

    const selectStuff = (event) => {
        const currentStuff = event.target.value
        const indexOf = stuff.indexOf(currentStuff)
        if (indexOf === -1) {
            stuff.push(currentStuff)
        } else {
            stuff.splice(indexOf, 1)
        }
    }

    const selectPrice = (event) => {
        price = event.target.value
    }

    const setFiltersValue = () => {
        const toSendArray = []
        if (color.length !== 0) {
            toSendArray.push(color)
        }
        if (stuff.length !== 0) {
            toSendArray.push(stuff)
        }
        if (price !== '') {
            toSendArray.push(price)
        }
        console.log("to send array is", toSendArray)
        setFilterValues(toSendArray)
        handleClose()
    }
    return (
        <div>
            <Dialog open={open} fullWidth maxWidth="lg">
                <form>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Choose Filters of your Desire
                        </DialogContentText>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div style={{ marginTop: "10px" }}>
                                Colors
                                <FormGroup>
                                    <FormControlLabel value={'Black'} control={<Checkbox size='small' />} onChange={selectColor} label="Black" />
                                    <FormControlLabel value={'White'} control={<Checkbox size="small" />} onChange={selectColor} label="White" />
                                    <FormControlLabel value={'Red'} control={<Checkbox size="small" />} onChange={selectColor} label="Red" />
                                    <FormControlLabel value={'Brown'} control={<Checkbox size="small" />} onChange={selectColor} label="Brown" />
                                </FormGroup>
                            </div>
                            <div style={{ marginTop: "10px" }}>

                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        // defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="<1000" control={<Radio size='small' />} onChange={selectPrice} label="Less than 1000" />
                                        <FormControlLabel value="1000-2000" control={<Radio size='small' />} onChange={selectPrice} label="1000 - 2000" />
                                        <FormControlLabel value=">2000" control={<Radio size='small' />} onChange={selectPrice} label="Greater than 2000" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                Stuff
                                <FormGroup>
                                    <FormControlLabel value={'Plain'} control={<Checkbox size='small' />} onChange={selectStuff} label="Plain" />
                                    <FormControlLabel value={'Checks'} control={<Checkbox size="small" />} onChange={selectStuff} label="Checks" />
                                    <FormControlLabel value={'Printed'} control={<Checkbox size="small" />} onChange={selectStuff} label="Printed" />
                                    <FormControlLabel value={'Stripes'} control={<Checkbox size="small" />} onChange={selectStuff} label="Stripes" />
                                </FormGroup>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {
                            enableButton ? <Button onClick={setFiltersValue}>Apply Filters</Button> : <Button disabled>Apply Filters</Button>
                        }

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

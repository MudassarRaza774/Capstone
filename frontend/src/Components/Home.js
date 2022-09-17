import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import AddDialog from './AddDialog';
import HashLoader from 'react-spinners/HashLoader'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Sorting from './SortDialog';

function Home({ setProductData }) {
    const navigate = useNavigate()
    const [clothesData, setClothesData] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false) //dialog for adding items
    const [filterOpen, setFilterOpen] = useState(false) //dialog for filteration
    const [currentPage, setCurrentPage] = useState(1) //for pagination
    const [search, setSearch] = useState('') //for searching 
    const [sort, setSort] = useState('general'); //for sorting value=>in select
    const [filterValues, setFilterValues] = useState([]) //can get the data on which filter would apply

    const doFilter = filterValues.length
    console.log("do filter is ", doFilter)

    const handleSort = (event) => {
        setSort(event.target.value);
    };
    const seachChange = (event) => {
        setSearch(event.target.value)
    }

    const getData = async () => {
        setSpinner(true)
        if (doFilter === 0) {
            const result = await fetch(`/clothes/allVariety/${sort}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            if (result.status !== 200) {
                sessionStorage.setItem("loggedInUser", '')
                navigate('/login')
            } else {
                const data = await result.json()
                setClothesData(data)
                setSpinner(false)
            }
        } else {
            const result = await fetch(`clothes//allVariety/filter/${filterValues}`)
            if (result.status !== 200) {
                alert('No value matched with this filter')
            } else {
                const filteredResult = await result.json()
                console.log('fl is', filteredResult)
                setClothesData(filteredResult)
                setSpinner(false)
            }

        }

    }

    useEffect(() => {
        getData()
    }, [dialogOpen, sort, filterValues])

    const addItem = () => {
        setDialogOpen(true)
    }

    const addFilters = () => {
        setFilterOpen(true)
    }

    //for the specific product page i have to store the data into a state and then pass it on the next component
    const productPage = (target) => {
        let productIs = currentItems[target]
        setProductData(productIs)
    }

    //pagination process

    const filteredItems = clothesData.filter((value) => {
        return (
            value.name.toLowerCase().includes(search.toLowerCase())
        )
    })
    const postPerPage = 6
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentItems = filteredItems.slice(indexOfFirstPost, indexOfLastPost)
    const paginationLength = Math.ceil(filteredItems.length / postPerPage)

    //for pagination
    const handleChange = (event, value) => {
        setCurrentPage(value)
    };

    //reset applied filters
    const resetFilters = () => {
        setFilterValues([])
    }

    return (
        <>
            {
                spinner ? <HashLoader size={40} speedMultiplier={2} color="black" style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                }} /> :
                    <div style={{ padding: "15px" }} >
                        <div style={{ margin: "10px", display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <TextField label="Search By Name" color="primary" value={search} onChange={seachChange} size='small' autoComplete='false' type="search" />
                            </div>
                            <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "10px" }}>
                                    {
                                        doFilter !== 0 ? <Button variant='contained' onClick={resetFilters} color='inherit' >Reset Filters</Button> : null
                                    }
                                </div>
                                <div>
                                    <FormControl sx={{ minWidth: 120, mr: 1 }} size="small">
                                        <InputLabel >Sort</InputLabel>
                                        <Select
                                            value={sort}
                                            label="Sort"
                                            onChange={handleSort}
                                        >
                                            <MenuItem value={"sortPriceHigh"}>Price: High to Low</MenuItem>
                                            <MenuItem value={"sortPriceLow"}>Price: Low to High</MenuItem>
                                            <MenuItem value={"sortAtoZ"}>Alphabetically: A to Z</MenuItem>
                                            <MenuItem value={"sortZtoA"}>Alphabetically: Z to A</MenuItem>
                                            <MenuItem value={"general"}>Normal</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <Button sx={{ mr: 1 }} variant='contained' color="inherit" onClick={addFilters}>Apply Filters</Button>
                                </div>
                                <div>
                                    <Button variant='contained' color="inherit" onClick={addItem}>Add Item</Button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1}>
                                    {
                                        currentItems.map((cloth, index) => {
                                            return (
                                                <Grid item lg={2} md={3} xs={6} sm={4} key={index}>
                                                    <Card sx={{ maxWidth: 210 }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="220"
                                                            image={cloth.images[0]}
                                                            alt="product image"
                                                        />
                                                        <CardContent>
                                                            <Typography variant="h6">
                                                                {cloth.name}
                                                            </Typography>
                                                            <Typography variant="body2" >
                                                                PKR: {cloth.price}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions sx={{ textAlign: "center" }}>
                                                            <Link to="/singleproduct" sx={{ textAlign: "center" }} style={{ textDecoration: "none" }}>
                                                                <Button size="small" sx={{ textAlign: "center", color: "black" }} id={index} onClick={(e) => productPage(e.currentTarget.id)} >View Item</Button>
                                                            </Link>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        </div>
                        {dialogOpen ? <AddDialog setDialogOpen={setDialogOpen} /> : null}
                        {filterOpen ? <Sorting setFilterOpen={setFilterOpen} setFilterValues={setFilterValues} doFilter={doFilter} /> : null}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
                            <Stack spacing={2}>
                                <Pagination count={paginationLength} siblingCount={0} onChange={handleChange} variant="outlined" color="success" />
                            </Stack>
                        </div>
                    </div >
            }
        </>
    )
}

export default Home
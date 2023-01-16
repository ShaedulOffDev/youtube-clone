import {Search} from '@mui/icons-material'
import { IconButton, Paper } from "@mui/material"
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Searchbar = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if(value){
      navigate(`/search/${value}`)
    }
  }
  return (
    <Paper onSubmit={submitHandler} component={"form"} sx={{width: {xs: '90%', sm: "60%", md: '600px'}, border: '1px solid #ccc', pl: 2, boxShadow: 0}}>
      <input type="text" placeholder="Search..." className='search-bar' value={value} onChange={e => setValue(e.target.value)} />
      <IconButton type="submit">
        <Search/>
      </IconButton>
    </Paper>
  )
}

export default Searchbar

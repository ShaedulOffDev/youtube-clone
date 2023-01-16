import { useParams } from 'react-router-dom'
import {ApiService} from '../../service/api.service'
import { useEffect, useState } from 'react'
import { Box, Container, Typography } from "@mui/material"
import {Error, Videos} from '../'

const Search = () => {
  const [videos, setVideos] = useState([])
  const {id} = useParams()
  useEffect(() => {
    const getData = async () => {
      try{
        const data = await ApiService.fetching(`search?part=snippet&q=${id}`)
        setVideos(data.items)
      }catch(error){
        <Error/>
      }
    }
    getData()
  }, [id])
  return (
    <Box>
      <Container>
        <Typography variant="h4" fontWeight="bold" sx={{my: 1}}>
          Search results for <span style={{color: 'red'}}>{id}</span> videos
        </Typography>
        <Videos videos={videos}/>
      </Container>
    </Box>
  )
}

export default Search

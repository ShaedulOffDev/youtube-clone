import {useState, useEffect} from 'react'
import {Box, Container, Stack, Typography} from '@mui/material'
import {colors} from '../../constants/colors'
import {Category, Error, Videos} from '../'
import { ApiService } from '../../service/api.service'

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])

  const selectedCategoryHandler = ctg => setSelectedCategory(ctg)
  useEffect(() => {
    const getData = async () => {
      try{
        const data = await ApiService.fetching(`search?part=snippet&q=${selectedCategory}`)
        setVideos(data.items)
      }catch(error){
        <Error/>
      }
    }
    getData()
  }, [selectedCategory])
  return (
    <Stack>
      <Category selectedCategoryHandler={selectedCategoryHandler} selectedCategory={selectedCategory}/>
      <Box p={2} sx={{height: '90vh'}}>
        <Container>
          <Typography variant='h4' fontWeight={'bold'} mb={2}>
            {selectedCategory} <span style={{color: colors.secondary}}>videos</span>
          </Typography>
          <Videos videos={videos}/>
        </Container>
      </Box>
    </Stack>
  )
}

export default Main

import { Box, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {ApiService} from '../../service/api.service'
import {ChannelCard, Error, Loader, Videos} from '../'

const Channel = () => {
  const [channel, setChannel] = useState()
  const [videos, setVideos] = useState([])

  const {id} = useParams()
  useEffect(() => {
    const getData = async() => {
      try{
        const data = await ApiService.fetching(`channels?part=snippet&id=${id}`)
        setChannel(data.items[0])
        const dataVideos = await ApiService.fetching(`search?channelId=${id}&part=snippet%2Cid&order=date`)
        setVideos(dataVideos.items)
      }catch(err){
        <Error/>
      }
    }
    getData()
  }, [id]);
  if(!channel) return <Loader/>
  return (
    <Box minHeight={'95vh'}>
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
        <Box width={'100%'} height='300px' sx={{backgroundImage: `url(${channel?.brandingSettings?.image?.bannerExternalUrl})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '200px', backgroundRepeat: 'no-repeat'}}/>
        {channel &&
          <ChannelCard video={channel} marginTop='-150px'/>
        }
      </Box>
      <Container maxWidth={'90%'} sx={{marginTop:"-50px"}}>
        <Videos videos={videos}/>
      </Container>
    </Box>
  )
}

export default Channel

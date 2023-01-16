import { Box, Stack } from "@mui/material"
import {ChannelCard, VideoCard, Loader} from '../'

const Videos = ({videos}) => {
  if(!videos.length) return <Loader/>
  return (
    <Stack 
    direction={'row'} 
    flexWrap={'wrap'} 
    width={'100%'} 
    justifyContent={'center'} 
    alignItems={'center'} 
    gap={0}>
      {videos.map(item => (
        <Box key={item?.snippet?.title + Math.random()}>
          {item?.id?.videoId && <VideoCard video={item}/>}
          {item?.id?.channelId && <ChannelCard video={item}/>}
        </Box>
      ))}
    </Stack>
  )
}

export default Videos

import { Avatar, Card, CardContent, CardMedia, Typography, Stack } from '@mui/material'
import {colors}  from '../../constants/colors'
import React from 'react'
import {Link} from 'react-router-dom'
import { CheckCircle } from '@mui/icons-material'

const VideoCard = ({video}) => {
  return (
    <Card className='videoCard' sx={{width: {xs: '100%', sm: 360, md: 320}, m: '10px', boxShadow: 'none'}}>
      <Link to={`/video/${video.id.videoId}`}>
        <CardMedia className='videoCard-media' image={video?.snippet.thumbnails?.medium?.url} alt={video?.snippet?.title} sx={{width: '100%', height: 180}}/>
      </Link>
      <CardContent
        sx={{background: colors.primary, height: 200, position: 'relative'}}
      >
        <Link to={`/video/${video?.id?.videoId}`}>
          <Typography my={'5px'} sx={{opacity: .4}}>
            {video?.snippet?.publishedAt}
          </Typography>
          <Typography sx={{wordWrap: 'wrap'}} variant="subtitle1" fontWeight='bold'>
            {video?.snippet?.title.length > 60 ? video?.snippet?.title.slice(0, 50) + '...' : video?.snippet?.title}
          </Typography>
          {
          video.snippet?.description && 
          <Typography sx={{wordWrap: 'wrap', opacity: .6}} variant="subtitle2">
            {video?.snippet?.description?.slice(0, 60)}..
          </Typography>
          }
        </Link>
        <Link to={`/channel/${video.snippet?.channelId}`}>
          <Stack direction="row" position="absolute" bottom="10px" alignItems="center" gap="5px">
            <Avatar src={video?.snippet?.thumbnails.default.url}></Avatar>
            <Typography variant='subtitle2'>
              {video.snippet?.channelTitle}
              {
                video.snippet?.liveBroadcastContent !== 'none' &&
              <CheckCircle sx={{fontSize: 12, color: 'gray', ml: "5px"}}/>
              }
            </Typography>
          </Stack>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard

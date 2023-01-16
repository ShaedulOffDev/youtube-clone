import {Box, CardContent, CardMedia, Typography } from '@mui/material'
import {Link} from 'react-router-dom'

const ChannelCard = ({video, marginTop}) => {
  return (
    <Box sx={{boxShadow: 'none', borderRadius: 1, display: 'flex', justifyContent: 'center',  alignItems: 'center', width: {xs: '100%', sm: 360, md: 320}, height: 380, margin: 'auto 10px', marginTop: marginTop}}>
      <Link to={`/channel/${video?.snippet?.channelId}`}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'}}>
          <CardMedia image={video?.snippet?.thumbnails?.medium?.url} alt={video?.snippet?.title} sx={{width: 150, borderRadius: '50%', height: 150, m: 'auto', mb: 2, border: '1px solid #e3e3e3'}}/>
          <Typography variant='h6'>
            {video?.snippet?.title}
          </Typography> 
          {video?.statistics?.subscriberCount  &&
          <Typography sx={{fontSize: '15px', fontWeight: 500, color: 'gray'}}>
            {parseInt(video?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
          </Typography>
          }
        </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard

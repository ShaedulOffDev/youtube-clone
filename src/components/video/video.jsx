import { useCallback, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import {ApiService} from '../../service/api.service'
import {Box, Chip, Stack, Typography, Avatar} from '@mui/material'
import ReactPlayer from 'react-player'
import {CheckCircle, FavoriteOutlined, MarkChatRead, RepartitionRounded, Tag, Visibility} from '@mui/icons-material'
import renderHTML from 'react-render-html'
import {Error, Loader, Videos} from '../'

const VideoDetail = () => {
  const [video, setVideo] = useState(null)
  const [relatedVideo, setRelatedVideo] = useState(null)
  const [descr, setDescr] = useState({show: false, text: '', btnText: 'Show'})
  const {id} = useParams()
  useEffect(() => {
    const getData = async() => {
    try {
        const data = await ApiService.fetching(`videos?part=snippet,statistics&id=${id}`)
        const relatedData = await ApiService.fetching(`search?part=snippet,id&relatedToVideoId=${id}`)
        setVideo({snippet: data.items[0].snippet, statistics: data.items[0].statistics})
        setRelatedVideo(relatedData.items)
        setDescr(prevState => ({...prevState, text: data.items[0].snippet.description.slice(0,200)}))
      } catch (error) {
        <Error/>
      }
    }
    getData()
  }, [id])
  
  const descrHandler = () => (
    descr.show ? setDescr({text: video?.snippet?.description?.slice(0, 200), show: false, btnText: 'Show'}) : setDescr({text: video?.snippet?.description, show: true, btnText: 'Hide'}
  ))
    
  const countHandler = (prop) => {
    const vc = parseInt(prop)
    if(vc > 1000000000){
      return `${(vc / 1000000000).toFixed(2)}B`
    }else if(vc > 1000000){
      return `${(vc / 1000000).toFixed(2)}M`
    }else if(vc > 1000){
      return `${(vc / 1000).toFixed(2)}K`
    }else{
      return vc.toLocaleString()
    }
  }
  if(!video) return <Loader/> 
  
  return (
    <Box minHeight={'70vh'} pb="30px">
      {video &&
      <Box display="flex" className="video-detailbox">
        <Box width={'70%'} className="video-detailbox__item1">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls/>
          {video.snippet.tags &&
            video.snippet.tags.map(tag => (
              <Chip key={tag} label={tag} onDelete={() => {}} deleteIcon={<Tag/>} variant='outlined' sx={{marginTop: '10px', cursor: 'pointer', ml: 2}}>
              </Chip>
            ))
          }
          <Typography variant='h5' mt={'10px'} fontWeight={'bold'} sx={{paddingLeft: 2}}>
            {video.snippet?.title}
          </Typography>
          <Stack direction={'row'} gap="20px" alignItems="cemter" py={1} px={2}>
            <Stack sx={{opacity: .7}} direction='row' alignItems='center' gap='3px'>
              <Visibility/>
              {countHandler(video.statistics.viewCount)}
            </Stack>
            <Stack sx={{opacity: .7}} direction='row' alignItems='center' gap='3px'>
              <FavoriteOutlined/>
              {countHandler(video.statistics.likeCount)}
            </Stack>
            <Stack sx={{opacity: .7}} direction='row' alignItems='center' gap='3px'>
              <MarkChatRead/>
              {countHandler(video.statistics.commentCount)}
            </Stack>
          </Stack>
          <Typography variant='subtitle2' sx={{opacity: .8, paddingLeft: 2}}>
            {renderHTML(descr.text)}...
            <button onClick={descrHandler} style={{border: 0, background: 'transparent', textDecoration: 'underline', color: '#0011ff', fontWeight: 'bold', cursor: 'pointer'}}>{descr.btnText}</button>
          </Typography>
          <Stack direction='row' py={1} px={2}>
            <Link to={`/channel/${video.snippet?.channelId}`}>
              <Stack direction='row' alignItems='center' gap="5px" marginTop='5px'>
                <Avatar
                  alt={video.snippet?.channelTitle}
                  src={video.snippet?.thumbnails.medium.url}
                />
                <Typography variant='subtitle1'>
                  {video.snippet?.channelTitle}
                  {video.snippet.liveBroadcastContent !== 'none' && <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}}/>}
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Box> 
        <Box className="video-detailbox__item2" width={'30%'}
          py={{md: 1, xs: 5}}
          justifyContent='center'
          overflow={'scroll'}
          maxHeight={'100vh'}
          position={'sticky'}
          top={0}
        >
            <Videos videos={relatedVideo && relatedVideo}/>
        </Box>
      </Box>
      }
    </Box>
  )
}

export default VideoDetail
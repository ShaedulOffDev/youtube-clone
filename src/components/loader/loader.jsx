import {Box, Stack, CircularProgress} from '@mui/material'

const Loader = () => {
  return <Box minHeight={'90vh'} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} height={'100%'}>
      <CircularProgress/>
    </Stack>
  </Box>
}

export default Loader
import { Stack, Box } from "@mui/material"
import { Link } from "react-router-dom"
import {logo} from '../../constants'
import {colors} from '../../constants/colors'
import {Searchbar} from "../../components"

const Navbar = () => {
  return (
  <Stack 
    direction={"row"} 
    alignItems={"center"} 
    justifyContent={'space-between'} 
    p={2} 
    sx={{position: 'sticky', top: 0, zIndex: 99999, background: colors.primary}}
  >
    <Link to={'/'}>
      <img width={100} src={logo} alt="logo" />
    </Link>
    <Searchbar/>
    <Box/>
  </Stack>
  )
}

export default Navbar

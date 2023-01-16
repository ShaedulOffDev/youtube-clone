import { Stack } from "@mui/material"
import { category } from "../../constants"

const Category = ({selectedCategoryHandler, selectedCategory}) => {
  return (
    <Stack direction={'row'} sx={{overflowX: 'auto'}}>
      {category.map(ctg => (
        <button 
        onClick={() => selectedCategoryHandler(ctg.name)}
        className={`category-btn ${ctg.name === selectedCategory && "active-ctg" }`} key={ctg.name}>
          <span>{ctg.icon}</span>
          <span>{ctg.name}</span>
        </button>
      ))} 
    </Stack>
  )
}

export default Category

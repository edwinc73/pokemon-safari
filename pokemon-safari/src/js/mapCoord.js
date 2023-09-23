export const mapCoord = (coord) => {
  const coordArray = [[]]
  coord.map(block =>{
    if (coordArray[coordArray.length - 1].length < 70){
      coordArray[coordArray.length - 1].push(block)
    } else {
      coordArray.push([block])
    }
  }
  )
  return coordArray
}

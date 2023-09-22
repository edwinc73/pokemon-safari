const collisionMap = [[]]

collisions.map(block =>{
  if (collisionMap[collisionMap.length - 1].length < 70){
    collisionMap[collisionMap.length - 1].push(block)
  } else {
    collisionMap.push([block])
  }
})
console.log(collisionMap)



export const collision = () =>{
}

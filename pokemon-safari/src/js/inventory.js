export const findItem = (inventory, name ) => {
  const keys = Object.keys(inventory)
  const cate = keys.find(category => inventory[category].filter(item => item.name == name ).length > 0)
  return inventory[cate].find(item => item.name == name)
}

export const hasItem = (item) => {
  return item.quantity > 0
}

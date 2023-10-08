// import React, { useEffect, useState } from 'react'
// import { nanoid } from 'nanoid'

// import {PlayerThrowing} from "../Player/Player"
// import "./EncounterScreen.scss"
// import CaughtPokemon from "../../js/Pokemon.js"


// let lastMoveTime = 0;
// const debounceTime = 250;

// const shinyChance = 5 // out of 100
// const runChance = 75 //out of 100
// const pokemonMinimumLevel = 20 // out of 100
// // const maxCatchChance = 400 // max chances
// const maxCatchChance = 1 // test max chance
// const defaultPokeBall = {
//     name: "pokeball",
//     quantity: 10,
//     value: 0,
//     rarity: 1
// }
// const defaultBait  = {
//   name: "berry",
//   quantity : 5,
//   value: 5
// }

// const maxLevelModifier = 0.5 // out of 1 (50% difference)
// export default function EncounterScreen(props) {

//   // deconstruct object
//   const { encounteredPokemon, setEncounter, setEncounteredPokemon, setCaughtPokemonList, inventory, setInventory, setLoading} = props
//   const {name, sprites, types, weight} = encounteredPokemon
//   let base_experience = encounteredPokemon.base_experience || 255

//   // check inventory

//   const hasItem = item => item.quantity > 0

//   //update Inventory

//   const updateInventory = (item, type,action) => {
//       setInventory(prev => ({
//         ...prev,
//         [type]: {
//           ...prev[type],
//           [item.name]: {
//             ...prev[type][item.name],
//             quantity: action == "add" ? prev[type][item.name].quantity + 1 : prev[type][item.name].quantity - 1
//           }
//         }
//       }))
//   }

//   //update currentpokeball and current berry if used.

//   useEffect(()=>{
//     const baits = Object.keys(inventory.baits)
//     const pokeballs = Object.keys(inventory.pokeballs)

//     baits.forEach(name =>{
//       const bait = inventory.baits[name]
//       if(bait.name == currentBait.name){
//         bait.quantity != currentBait.quantity && setCurrentBait(bait)
//       }
//     })

//     pokeballs.forEach(name =>{
//       const pokeball = inventory.pokeballs[name]
//       if(pokeball.name == currentPokeball.name){
//         pokeball.quantity != currentPokeball.quantity && setCurrentPokeball(pokeball)
//       }
//     })
//   }, [inventory])

//   // setting the default pokeball
//   const [currentPokeball, setCurrentPokeball] = useState(defaultPokeBall)

//   // setting the default bait
//   const [currentBait, setCurrentBait] = useState(defaultBait)

//   useEffect(()=> {
//     setCurrentPokeball(defaultPokeBall)
//   },[encounteredPokemon])

//   //pokemon logic

//   const [pokemonLevel, setPokemonLevel] = useState(pokemonMinimumLevel + Math.floor(Math.random() * 80))
//   const pokemonName = encounteredPokemon && name.split("-")[0]

//   //shiny logic
//   const [isShiny , setIsShiny] = useState(Math.floor(Math.random() * 100) < shinyChance )

//   useEffect(() => {
//     setIsShiny(Math.floor(Math.random() * 100) < shinyChance)
//     setCaught(false)

//     // check if image has been loaded
//     if(encounteredPokemon){
//       const image = new Image
//       image.src = isShiny ? shinySprite.front : normalSprite.front

//       image.onload = ()=> {
//         setTimeout(() => {
//           setLoading(false)
//           const loadingScreen = document.querySelector(".loading")
//           loadingScreen.classList.remove("loading-fade-in")
//         }, 2000);
//         }
//     }
//   }, [encounteredPokemon])

//   const normalSprite = {
//     front: sprites?.front_default,
//     back: sprites?.back_default
//   }

//   const shinySprite = {
//     front: sprites?.front_shiny,
//     back: sprites?.back_shiny
//   }

//   // Setting item

//   const [bagWindow, setBagWindow] = useState(false)
//   const [currentItemIndex, setCurrentItemIndex] = useState(0)

//   useEffect(() => {
//     if (bagWindow) {
//       const items = document.querySelectorAll(".inventory>.item")
//       // remove active
//       items.forEach(item => {
//         if(item.classList.contains("active")){
//           item.classList.remove("active")
//         }
//       })
//       // add active
//       items[currentItemIndex].classList.add("active")
//     }
//   }, [bagWindow, currentItemIndex])

//   const openBag = () => {
//     setBagWindow(true);
//   };

//   const closeBag = () => {
//     setBagWindow(false);
//   };

//   useEffect(() => {
//     const navigateInventory = async (e) => {
//       const pokeballs = Object.keys(inventory.pokeballs)
//       const baits = inventory.baits
//       if(bagWindow){
//         switch (e.key) {
//           case "ArrowDown":
//             await setCurrentItemIndex(prev => prev + 1 > 5 ? 5 : prev + 1)
//           break;
//           case "ArrowUp":
//             await setCurrentItemIndex(prev => prev - 1 < 0 ? 0 : prev - 1)
//           break;
//           case "x":
//             await closeBag()
//           break;
//           case "z":
//             if(currentItemIndex < 3){
//               await setCurrentPokeball(inventory.pokeballs[pokeballs[currentItemIndex]])
//               await closeBag()
//             } else {
//               if(currentItemIndex == 4){
//                 await setCurrentBait(baits.berry)
//               } else {
//                 await setCurrentBait(baits.banana)
//               }
//               await closeBag()
//             }
//             break;
//           default:
//           break;
//         }
//       }
//     }

//     document.addEventListener("keydown", navigateInventory)
//     return () => {
//       document.removeEventListener("keydown", navigateInventory)

//     };
//   },[bagWindow, inventory, currentItemIndex, closeBag])

//   // system interface navigation

//   const [activeButtonIndex, setActiveButtonIndex] = useState(0)

//   useEffect(()=> {
//     setActiveButtonIndex(0)
//   },[encounteredPokemon])

//   useEffect(()=>{
//     if (encounteredPokemon) {
//       const interfaceButtons = document.querySelectorAll(".inferface-container")[0].childNodes;
//       interfaceButtons.forEach(button => {
//         button.classList.contains("active") && button.classList.remove("active");
//       });
//       interfaceButtons[activeButtonIndex].classList.add("active");
//     }
//   },[encounteredPokemon, activeButtonIndex])

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const currentTime = new Date().getTime();
//       if (currentTime - lastMoveTime < debounceTime) {
//         return;
//       } else {
//         if (encounteredPokemon && !bagWindow) {
//           switch (e.key) {
//             case "ArrowUp":
//               setActiveButtonIndex(prev => (prev >= 2 && prev <= 3) ? prev - 2 : prev);
//             break;
//             case "ArrowDown":
//               setActiveButtonIndex(prev => (prev < 2 && prev >= 0) ? prev + 2 : prev);
//             break;
//             case "ArrowLeft":
//               setActiveButtonIndex(prev => (prev % 2 > 0) ? prev - 1 : prev);
//             break;
//             case "ArrowRight":
//               setActiveButtonIndex(prev => (prev % 2 === 0) ? prev + 1 : prev);
//             break;
//             case "z":
//               switch (activeButtonIndex) {
//                 case 0:
//                   setThrow()
//                 break;
//                 case 1:
//                   if(currentBait && hasItem(currentBait)){
//                     setUseBerry(true)
//                   } else if(!currentBait) {
//                     alert("Please select berry")
//                   } else if (!hasItem(currentBait)){
//                     alert("No more berries!")
//                   }
//                 break;
//                 case 2:
//                   openBag()
//                 break;
//                 case 3:
//                   run()
//                 break;
//               }
//             break;
//             default:
//             break;
//           }
//         }
//         lastMoveTime = currentTime
//       }
//     };

//     document.addEventListener("keyup", handleKeyDown);
//     return () => {
//       document.removeEventListener("keyup", handleKeyDown);
//     };
//   }, [encounteredPokemon, bagWindow, lastMoveTime]);

//   //system messages
//   const messages = {
//     default: "What would you like to do?",
//     encounter: `You encountered a ${pokemonName}!`,
//     berry: `You used a berry, ${pokemonName} is now easier to catch`,
//     throw: "you throw a pokeball",
//     caught: `You caught a ${isShiny ? "shiny" : ""} ${pokemonName}`,
//     failed: "Darn, so close!",
//     failedRun: `${pokemonName} blocked your escape!`
//   }

//   const [systemMessage, setSystemMessage] = useState(messages.encounter)

//   useEffect(() => {
//     setSystemMessage(messages.encounter)
//   }, [encounteredPokemon])

//   //capture logic
//   const [throwing, setThrowing] = useState(false)
//   const [caught, setCaught] = useState(false)

//   useEffect(() => {
//     setCaught(false)
//   }, [encounteredPokemon])

//   const isCaught = () => {
//     const pokeballValue = currentPokeball.value
//     const levelAdjuster = ((pokemonLevel / 100) * maxLevelModifier) + 1
//     const attempt =  Math.floor(Math.random() * maxCatchChance)
//     return attempt + pokeballValue > base_experience * levelAdjuster
//   }

//   // set pokemon level
//   useEffect(() => {
//     setPokemonLevel(pokemonMinimumLevel + Math.floor(Math.random() * 80))
//   }, [encounteredPokemon])

//   const flashAnimation = (node) => {
//     node.classList.add("flash")
//     setTimeout(() => {
//       node.classList.remove("flash")
//     }, 1500);
//   }

//   // catching

//   const setThrow = async () => {
//     // check if inventory has pokeball
//     if(!throwing && !caught && hasItem(currentPokeball)){
//       await setThrowing(true)
//       await updateInventory(currentPokeball, "pokeballs", "remove")
//     }
//   }

//   useEffect(() => {
//     const pokemonImage = document.querySelector("#pokemonImage")
//     const pokeballName = currentPokeball.name

//     const setPokeBallImage =  (element, action) => {
//       element.classList.add(`catching${action ? "-"+action : ""}`)
//       element.style.backgroundImage = `url("/pokeballs/${pokeballName}/${action ? action[0].toUpperCase() + action.slice(1) : "Catching"}.png")`
//     }
//     if(throwing){
//       const playerThrowing = document.querySelector("#player-throwing")
//       const ballContainer = document.querySelector(".ball-container")
//       const pokemonBallAnimation = document.querySelector("#pokemonBallAnimation")

//       setSystemMessage(messages.throw)
//       playerThrowing.classList.add("throw")

//       ballContainer.classList.add("ball-animation")
//       ballContainer.style.backgroundImage = `url("/pokeballs/${pokeballName}/Throwing.png")`

//       const wasCaught = isCaught();
//       setCaught(wasCaught);

//       const maxCatchingTime = 2000 + 2000/3

//       const randomCatchingTime = () => {
//         let randomTime = Math.random()
//         if(wasCaught){
//           return randomTime > 0.9 ? 2000 / 3 : maxCatchingTime
//         }

//         if(randomTime > 0.8){
//           return 500
//         } else if (randomTime > 0.65){
//           return 2000 / 3
//         } else if (randomTime > 0.3){
//           return 2000 / 3 * 2
//         } else {
//           return maxCatchingTime
//         }
//       }

//       const randTime = randomCatchingTime()

//       setTimeout(() => {
//         if(wasCaught){
//           setTimeout(()=>{
//             const caughtPokemon = new CaughtPokemon(nanoid(), pokemonName, isShiny ? shinySprite.front : normalSprite.front, pokemonLevel, isShiny);
//             setCaughtPokemonList(prevState => [...prevState, caughtPokemon]);
//             setSystemMessage(messages.caught);
//             setTimeout(() => {
//               pokemonBallAnimation?.classList.remove("catching-success")
//               clearEncounter();
//             }, 3000);
//           }, randTime)
//         } else {
//             setSystemMessage(messages.failed);
//             setTimeout(() => {
//                 setSystemMessage(messages.default);
//             }, randTime);
//         }
//       }, randTime);

//       setTimeout(() => {
//         ballContainer.classList.remove("ball-animation")
//         flashAnimation(pokemonImage)
//         pokemonImage.classList.add("unshow")
//         setPokeBallImage(pokemonBallAnimation, "")
//         setTimeout(() => {
//           if(wasCaught){
//             setPokeBallImage(pokemonBallAnimation, "success")
//           } else {
//             setPokeBallImage(pokemonBallAnimation, "fail")
//             setTimeout(() => {
//               pokemonBallAnimation.classList.remove("catching-fail")
//               flashAnimation(pokemonImage)
//               pokemonImage.classList.remove("unshow")
//             }, 500);
//           }
//           pokemonBallAnimation.classList.remove("catching")
//         }, randTime);
//       }, 925);

//       setTimeout(() => {
//           setThrowing(false);
//           playerThrowing.classList.remove("throw");
//           setUseBerry(false)
//       }, randTime + 930 + 500 + 2000);
//     }
//   }, [throwing])


//   // using berry

//   const [berryValue, setBerryValue] = useState(0)
//   const [useBerry, setUseBerry] = useState(false)

//   useEffect(()=>{
//     if(currentBait != ""){
//       setBerryValue(currentBait.value)
//     } else {
//       setBerryValue(0)
//     }
//   }, [currentBait, throwing])

//   //use Berry

//   useEffect(()=>{
//     const pokemonImage = document.querySelector("#pokemonImage")
//     const nameTag = document.querySelector(".wild-pokemon>.name-tag")

//     if(useBerry){
//       const image = new Image
//       image.src = berryImage
//       image.id = "pokemon-img"
//       image.style.width = "42px"
//       image.style.height = "42px"
//       nameTag.appendChild(image)

//       const berryFadeImage = new Image
//       berryFadeImage.src = berryImage
//       berryFadeImage.style.width = "100px"
//       berryFadeImage.style.height = "100px"

//       berryFadeImage.classList.add("berryFadeAnimation")
//       setTimeout(() => {
//         pokemonImage.removeChild(document.querySelector(".berryFadeAnimation"))
//       }, 3000);

//       pokemonImage.appendChild(berryFadeImage)
//       updateInventory (currentBait, "baits", "remove")
//     } else {
//       const domImage = document.querySelector(".wild-pokemon #pokemon-img")
//       if(nameTag.contains(domImage)){
//         nameTag.removeChild(domImage)
//       }
//     }
//   }, [useBerry])

//   //run logic
//   const run = () => {
//     if(runChance > Math.floor(Math.random() * 100)){
//       clearEncounter()
//     } else {
//       setSystemMessage(messages.failedRun)
//     }
//   }

//   const clearEncounter = () =>{
//     setEncounter(false)
//     setEncounteredPokemon("");
//     setBagWindow(false)
//     setBerry(false)
//     setBerryImage("/berry/RazzBerry.png")
//   }

//   // styles

//   const pokemonImageStyle = {
//     backgroundImage : `url(${isShiny ? shinySprite.front : normalSprite.front})`
//   }

//   const inventoryWindow = () => {
//     const inventoryCategories = Object.keys(inventory)
//     const pokeballsCategories = Object.keys(inventory[inventoryCategories[0]])
//     const baitsCategories = Object.keys(inventory[inventoryCategories[1]])

//     return (
//       <div className="inventory d-flex flex-column">
//       {pokeballsCategories.map((itemName) => {
//         const pokeball = inventory.pokeballs[itemName]
//         return(
//           <div key={itemName+"container"} className="pokeball-section item d-flex flex-column justify-content-center">
//             <div className="item-image" id={itemName}></div>
//             <span className='d-flex justify-content-between'><h3 className='inventory-item'>{itemName}</h3> <h3>x {pokeball.quantity}</h3></span>
//           </div>
//         )
//       })}
//       <div className="bag-split w-100"></div>
//       {baitsCategories.map((itemName) => {
//         const bait = inventory.baits[itemName]
//         return(
//           <div key={itemName+"container"} className="bait-section item d-flex flex-column justify-content-center">
//             <div className="item-image" id={itemName}></div>
//             <span className='d-flex justify-content-between'><h3 className='inventory-item'>{itemName}</h3> <h3>x {bait.quantity}</h3></span>
//           </div>
//         )
//       })}
//     </div>
//     )
//   }

//   const [berryImage, setBerryImage] = useState(`/berry/RazzBerry.png`)

//   useEffect(()=>{
//     const setStyle = async () => {
//       if(currentBait == "berry"){
//         await setBerryImage("/berry/RazzBerry.png")
//       } else if (currentBait == "banana"){
//         await setBerryImage("/berry/NanabBerry.png")
//       }
//     }

//     setStyle()
//   }, [currentBait, currentPokeball])

//   const berryStyle = {
//     opacity: useBerry ? 1 : 0.2
//   }

//   return (
//     <>
//       <div id="encounter-screen" className='game d-flex'>
//         <div className="battle-section p-3">
//           <div className="wild-pokemon p-3">
//             <div className="img-container">
//               <div id="pokemonImage" className="d-flex justify-content-center align-items-center" style={pokemonImageStyle}></div>
//               <div id="pokemonBallAnimation" className=''> </div>
//               <div className='pokemonImageShadow'></div>
//             </div>
//             <div className="name-tag rounded p-1 d-flex">
//               <div className="name">
//                 {pokemonName} Lv{pokemonLevel}
//                 {isShiny && <span><img src="./sparkle.svg" className="shiny-icon" alt="" /></span>}
//               </div>
//             </div>
//           </div>
//           <div className="player-section d-flex justify-content-center">
//             <PlayerThrowing />
//             <div className="ball-container"></div>
//             <div className="name-tag rounded p-1">
//               <div className="name">
//                 Player Name
//               </div>
//               <div className="items d-flex justify-content-between">
//                 <div className="item">
//                   <img src="" alt="" /> x 1
//                 </div>
//                 <div className="item">
//                   <img src="" alt="" /> x 1
//                 </div>
//                 <div className="item">
//                   <img src="" alt="" /> x 1
//                 </div>
//                 <div className="item">
//                   <img src="" alt="" /> x 1
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="inventory-overlay w-100 d-flex justify-content-center align-items-center">
//             {bagWindow && inventoryWindow()}
//           </div>
//         </div>
//         <div className="battle-interface row w-100 p-3">
//           <div className="system-message rounded col-6 p-3 d-flex justify-content-left align-items-center">
//             {systemMessage}
//           </div>
//           <div className="inferface-container col-6">
//             <div className="button rounded"><img className="interface-pokeball-image" src={`/pokeballs/${currentPokeball.name}/idle.png`} /><h2>Capture</h2></div>
//             <div className="button rounded"><img className="interface-pokeball-image" src={berryImage} style={berryStyle} /><h2>Berry</h2></div>
//             <div className="button rounded"><img className="interface-pokeball-image interface-image-large" src="/bag.png" /><h2>Bag</h2></div>
//             <div className="button rounded" onClick={run}><img className="interface-pokeball-image" src="/run.png" /><h2>Run</h2></div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// // set running logic and animation

// //add random items on the map

// // add lazy loading and a loading screen to make sure the images are loaded in before the user sees it

import { useState,useCallback ,useEffect, useRef } from 'react'

function App() {
  const [length,setlength]=useState(8)
  const[NumberAllow,setNumberAllow]=useState(false)
  const[CharacterAllow,setCharacterAllow]=useState(false)
  const [Password,setPassword]=useState("")

  //useref hooks
  const passwordRef=useRef(null)


  const passwordGenerator=useCallback(()=>{     // memorize the function call itself everytime any of the dependencies change 
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumberAllow) {
      str+="0123456789"
    }
    if (CharacterAllow) {
      str+="!@#$%^&*(){}[]:<>?/.,_+-="
    }

    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setPassword(pass)


  },[length,NumberAllow,CharacterAllow,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,NumberAllow,CharacterAllow,passwordGenerator])

  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()  // to show the selceted effect 
    passwordRef.current?.setSelectionRange(0,50) // to select the given range from the generated password

    window.navigator.clipboard.writeText(Password)
  },[Password])


  return (
    <div className='w-full h-screen bg-black'>
      <h1 className='text-white flex flex-wrap justify-center'>Password Generator</h1>
      <div className='  bg-slate-500 p-5 w-full max-w-md mx-auto text-orange-400 rounded-lg m-8  '>
        <input className="rounded p-1 w-80" type="text" value={Password} placeholder='password' readOnly ref={passwordRef}/>
        <button className='bg-blue-500 text-white rounded p-1 hover:bg-blue-900' onClick={copyPasswordToClipBoard}>Copy</button>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" value={length} max={30} min={5} className='cursor-pointer' onChange={(e)=>{setlength(e.target.value)}}/>
          <label >Length :{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={NumberAllow} id="numberInput" onChange={()=>{setNumberAllow((prev)=>!prev)}} />
          <label >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={NumberAllow} id="numberInput" onChange={()=>{setNumberAllow((prev)=>!prev)}} />
          <label >Characters</label>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App

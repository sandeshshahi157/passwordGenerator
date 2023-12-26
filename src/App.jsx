
import { useState, useCallback,useEffect,useRef } from "react";
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [Nallowed, setNallowed] = useState(false);
  const [chrAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Nallowed) str += "0123456789";
    if (chrAllowed) str += "!@#$%^&*{}[]+_-=()'~";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, Nallowed, chrAllowed, setPassword]);
  useEffect(() => {
    PasswordGenerator()

  }
  ,[length,Nallowed,chrAllowed,PasswordGenerator])
  //useRef
  const passRef = useRef(null);
  const copyClip =useCallback(() =>{
   
    window.navigator.clipboard.writeText(Password)
    alert("Copied password")
  },[Password])

  return (
    <>
      <div className="container-3 mx-auto shadow-md rounded-lg px-4 my-8 h-40 pt-2 text-orange-500 bg-gray-700">
     <div className="container text-center pb-3 text-xl text-white">
     <h1>Password Generator</h1> 
     </div>
        <div className="flex shadow rounded-lg overflow-hidden">
       
          <input
            type="text"
            className=" text-center h-10 w-full"
            value={Password}
            placeholder="Password"
            readOnly
          />
          <button 
          ref={passRef}
          onClick={copyClip}
          
          className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-5 mt-5">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className="cursor-pointer"
              min={8}
              max={40}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked ={Nallowed}
              onChange={() => {
                setNallowed((prev) => !prev);
              }}
            ></input>
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked ={setcharAllowed}
              onChange={() => {
                setcharAllowed((prev)=> !prev);
              }}
            ></input>
            <label>Character</label>
          </div>
        </div>
      </div>
      </>
  )
}

export default App

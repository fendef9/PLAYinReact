import { useState, useMemo} from "react";
import React from "react";
import MyInput from "./MyInput";
import BoilingVerdict from "./BoilingVerdict";

const tempCalc = () => {
  const [input,setInput] = useState({name:"",val:""});

  const toCelsius = fahrenheit  => (fahrenheit - 32) * 5 / 9;
  const toFahrenheit = celsius => (celsius * 9 / 5) + 32;
  
  const twoWayConvertation = (inputType, val) =>{
    const value = Number(val);
    if(!value || !inputType){
      return{
        fahrenheit:"",
        celsius:""
      }
    }
    else{
        if(inputType ==="f"){
          return {
            fahrenheit:val.toString(),
            celsius:toCelsius(val).toString()
          }
        }
        else if (inputType ==="c"){
          return {
            fahrenheit:toFahrenheit(val).toString(),
            celsius:val.toString()
          }
        }
      }
    }

    const memoizedCallback = useMemo(
      () => {return twoWayConvertation(input.name,input.val)},
      [input.name,input.val]
    )
    return(
      <div>
        <MyInput 
          type="c"
          onChange={setInput}
          value={memoizedCallback.celsius}
          name="celsius"
        />
        <MyInput 
          type="f"
          onChange={setInput}
          value={memoizedCallback.fahrenheit}
          name="fahrenheit"
        />
        <hr />
        <BoilingVerdict cel={memoizedCallback.celsius}/>
      </div>
    )
}

export default tempCalc;
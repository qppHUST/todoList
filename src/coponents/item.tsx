import React, { useState } from 'react'
import correctGray from '../static/img/correct-gray.png'
import correctGreen from '../static/img/correct-green.png'
import trashGray from '../static/img/trash-gray.png'
import trashRed from '../static/img/trash-red.png'
 
export default function (props:any) {
  const {obj,methods} = props
  const [leftHoverStatus,setLefthoverStatus] = useState(0);
  const [rightHoverStatus,setRightHoverStatus] = useState(0);

  let leftImgSrc = leftHoverStatus === 1? correctGreen : (obj.activeLeft === '0' ? correctGray : correctGreen)
  let rightImgSrc = rightHoverStatus === 1? trashRed :  trashGray 

  const leftMouseOver = ()=>{setLefthoverStatus(1)}
  const rightMouseOver = ()=>{setRightHoverStatus(1)}
  const leftMouseLeave = ()=>{setLefthoverStatus(0)}
  const rightMouseLeave = ()=>{setRightHoverStatus(0)}

  const leftImg =  
    <img src= { leftImgSrc }   onMouseOver = {leftMouseOver}  onMouseLeave = {leftMouseLeave} id='leftImg' onClick={()=>{methods.leftImgClick(obj.hash)}}  /> 
  const rightImg =  
    <img src= {rightImgSrc} onMouseOver = {rightMouseOver} onMouseLeave = {rightMouseLeave} id='rightImg' onClick={()=>{methods.rightImgClick(obj.hash)}} />

  return <div className='itemContainer'>
    <div>
      {leftImg}
    </div>
    <div className='textContainer'>
      <div className={obj.activeLeft === '1' ? 'textWithline' :''}>
        {obj.value}
      </div>
      <div className={obj.activeLeft === '1' ? 'textWithline' :''}>
        {obj.timeStamp}
      </div>
    </div>
    <div>
      {rightImg}
    </div>
  </div>
}

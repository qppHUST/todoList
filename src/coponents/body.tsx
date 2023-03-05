const React = require('react')
const { useState } = require('react')
const { v4: uuid } = require('uuid')
const dayjs = require('dayjs')
import List from './list'
import { DataToSet } from '../interface/datatoset'
import { useEffect } from 'react'
import { processData }from '../utils/tool'

export default function () {
  const [value, setValue] = useState('') // 输入框中的东西
  const [data, setData] = useState([]) //localstorage里面存的东西
  const [state,setState] = useState(0) //当前可不可以添加新的任务

  useEffect(()=>{
    localStorage.setItem('todoList',JSON.stringify(data))
  },[data])

  const leftImgClick = (hash:string)=>{
    let newData = [];
      for(let i =0;i<data.length;i++){
        let bridge = data[i];
        if(bridge.hash === hash){
          if(bridge.activeLeft === '0'){
            bridge.activeLeft = '1';
          }else{
            bridge.activeLeft = '0';
          }
        }
        newData.push(bridge);
      }
    const sortedNewData = processData(newData);//对数据根据要求进行排序
    setData([...sortedNewData]);
  }

  const rightImgClick = (hash:string)=>{
    const newData = data.filter((e:DataToSet) =>{
      return e.hash !== hash
    })
    setData([...newData]);
  }

  useEffect(()=>{
    const fromLocalStorage = localStorage.getItem('todoList')
    if (fromLocalStorage !== null && fromLocalStorage.length > 0) {
      const data = JSON.parse(fromLocalStorage)
      const processedData = processData(data);
      setData(processedData)
    }
  },[])//相当于didamount函数

  const enterEvent = (e: any) => {
    if (e.keyCode === 13) {
      if(state === 1){//防止加入任务加入得太快了
        window.alert('操作太快了，慢点哦~~~')
        setValue('')
        return;
      }
      if (value === '') {
        alert('请输入数据')
        return
      }
      let hashcode = uuid()
      const timeStamp = dayjs().format('MM月DD日 HH:mm:ss')
      const datatoset = new DataToSet('0', value, '0', hashcode, timeStamp)
      data.push(datatoset);
      const newData = processData(data);
      setData([...newData]);
      setValue('');
      setState(1);
      setTimeout(()=>{
        setState(0)
      },1000)
    }
  }

  const methods = {
    leftImgClick:leftImgClick,
    rightImgClick:rightImgClick
  }

  return (
    <div>
      <input
        placeholder=" what is need to be done ?"
        className="inputbox"
        id="input"
        value={value ? value : ''}
        onKeyDown={(e)=>{enterEvent(e)}}
        onChange={(e: any) => {
          setValue(e.target.value)
        }}
      ></input>
      <List data={data} methods={methods}></List>
    </div>
  )
}


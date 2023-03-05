import dayjs from "dayjs";
import { DataToSet } from "../interface/datatoset"
require('dayjs/locale/zh-cn')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const processData = (data:DataToSet[])=>{
  let unaccomplishedItemList:any[] =[]
  let accomplishedItemList:any[] = []
  data.forEach(element => {
    if(element.activeLeft === '1'){
      accomplishedItemList.push(element)
    }else{
      unaccomplishedItemList.push(element)
    }
  });
  const newUnaccomplishedItemList = sortByTime(unaccomplishedItemList);
  const newAccomplishedItemList = sortByTime(accomplishedItemList);
  return newUnaccomplishedItemList.concat(newAccomplishedItemList);
  
}

function sortByTime(list:any[]):any[]{
  const newList = list.sort((o1,o2) =>{
    if(o1.timeStamp === o2.timeStamp){
      return -1;
    }
    const timeForO1 = dayjs(o1.timeStamp,"MM月DD日 HH:mm:ss",'zh-cn');
    const timeForO2 = dayjs(o2.timeStamp,"MM月DD日 HH:mm:ss",'zh-cn');
    const result = timeForO1.isBefore(timeForO2);
    // console.log(`o1: ${JSON.stringify(timeForO1)}, o2: ${JSON.stringify(timeForO2)} , isBefore: ${result}`)
    return result?1:-1;
  })
  return newList;
}

export{
  processData
}
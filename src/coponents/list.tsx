import React, { useEffect, useState } from 'react'
import Item from './item'
import {v4 as uuid} from 'uuid'

export default function (data: any ) {
    const show = data.data.map((number: any, index:any) =>
    <div className='listContainer' key={uuid()}>
        <Item obj={number} methods={data.methods}></Item>
        <hr style={{width:"100%"}}></hr>
    </div>
    );
    return <div>{show}</div>
}

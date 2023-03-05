import React from 'react'
import { createRoot } from 'react-dom/client'
import Title from './coponents/title'
import './static/css/index.css'
import Body from './coponents/body'

function Example() {
  return (
    <div className='mainBody'>
      <Title></Title>
      <Body></Body>
    </div>
  )
}

const container = document.getElementById('app')
const root = createRoot(container)

root.render(Example())

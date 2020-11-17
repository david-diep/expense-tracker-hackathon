import React from 'react'


export default function Chip(props){
  const {text, backgroundColor,title} = props||'';
  const dark = ['#000000', '#808080', '#800000', '#FF0000', '#008000', '#008080', '#800080','#000080']
  return(
    <div style={{
      borderRadius: '45px',
      color:`${dark.includes(backgroundColor)?'white':'black'}`,
      display: 'inline-block',
      padding: '2px 8px',
      backgroundColor:`${backgroundColor}`,
      fontSize: `${title?'1.6rem':'1rem'}`,
      fontWeight: `${title ? 'bold' : 'normal'}`
    }}>
      {text}
    </div>
  )
}

import React from 'react'


export default function Chip(props){
  const {text, backgroundColor, outline} = props||'white';
  const dark = ['#000000', '#808080', '#800000', '#FF0000', '#008000', '#008080', '#800080','#000080']
  const light = ['#FF00FF', '#FFFF00', '#00FF00','#00FFFF']

  return(
    <div style={{
      borderRadius: '40px',
      color:`${dark.includes(backgroundColor)?'white':'black'}`,
      display: 'inline-block',
      padding: '2px 6px',
      backgroundColor:`${backgroundColor}`,
      outline:`${outline}`,
      fontSize:'1.2rem'
    }}>
      {text}
    </div>
  )
}

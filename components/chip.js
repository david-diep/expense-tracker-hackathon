import React from 'react'


export default function Chip(props){
  const {text, backgroundColor,title} = props||'';
  const dark = ['black',
    'gray',
    'maroon',
    'red',
    'green',
    'purple',
    'navy',
    'teal'
  ]
  return(
    <div style={{
      borderRadius: '45px',
      color:`${dark.includes(backgroundColor)?'white':'black'}`,
      textAlign: 'center',
      display: 'inline-block',
      padding: '2px 8px',
      backgroundColor:`${backgroundColor}`,
      fontSize: `${title?'1.6rem':'1rem'}`,
      fontWeight: `${title ? 'bold' : 'normal'}`,
    }}>
      {text}
    </div>
  )
}

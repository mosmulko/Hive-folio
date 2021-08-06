import React from 'react';

const CardInfo = () => {
  return (
    <svg className='card__info' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 603.23 741.42">
        <a href="/project">
          <polygon className="card__info--background" points="603.23 223.22 603.23 518.2 301.62 690.93 0 518.2 0 223.22 301.62 50.49 603.23 223.22"/>
        </a>
        <text className='card__info--text subheader' dominantBaseline="middle" textAnchor="middle">
          <tspan x="50%" y="42%">Hello</tspan>
          <tspan x="50%" y="50%">Something Name</tspan>
          <tspan x="50%" y="58%">Year</tspan>
        </text> 
      </svg>
  )
}

export default CardInfo;
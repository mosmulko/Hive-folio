import React from 'react';

const CardImage = ({img}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 603.23 741.42">
        <polygon className="color--highlight" points="0 172.73 301.62 0 603.23 172.73 603.23 568.69 301.62 741.42 0 568.69 0 172.73"/>
        <image className="card__img" xlinkHref={'/images/gallery/' + img} preserveAspectRatio="xMidYMin slice"></image>
      </svg>
  )
}

export default CardImage;
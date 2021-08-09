import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

function Gallery() {
  return (
    <>
      <section className='gallery__section gallery__section--column gallery__section--first'>
        <article className='gallery__card card'>
          <CardImage img='img1.jpg'/>
          <CardInfo />
        </article>
      </section>
      <section className='gallery__section gallery__section--column gallery__section--second'>
        <article className='gallery__card card'>
          <CardImage img='img2.jpg'/>
          <CardInfo />
        </article>
      </section>
      <section className='gallery__section gallery__section--fluid gallery__section--third'>
        <article className='gallery__card card'>
          <CardImage img='img3.jpg'/>
          <CardInfo />
        </article>
      </section>
    </>
  )
}

export default Gallery;
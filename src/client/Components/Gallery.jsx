import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

function Gallery() {
  return (
    <>
      <section class='gallery__section gallery__section--column gallery__section--first'>
        <article class='gallery__card card'>
          <CardImage />
          <CardInfo />
        </article>
      </section>
      <section class='gallery__section gallery__section--column gallery__section--second'>
        <article class='gallery__card card'>
          <CardImage />
          <CardInfo />
        </article>
      </section>
      <section class='gallery__section gallery__section--fluid gallery__section--third'>
        <article class='gallery__card card'>
          <CardImage />
          <CardInfo />
        </article>
      </section>
    </>
  )
}

export default Gallery;
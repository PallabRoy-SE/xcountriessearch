import React from 'react';
import style from './Card.module.css';
function Card({ flag, name, alt }) {
    return (
        <div className={style.card_container}>
            <section className={style.image_container}>
                <img src={flag} alt={alt} />
            </section>
            <section className={style.text_container}>
                <span>{name}</span>
            </section>
        </div>
    );
}

export default Card;

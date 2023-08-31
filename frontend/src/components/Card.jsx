import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onAddCard, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = card.likes.find((like) => like._id === currentUser._id);

  return (
    <>
      {currentUser._id === card.owner._id && (
        <button
          type="button"
          className="element__button-delete"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        src={card.link}
        alt={`${card.name}`}
        className="element__image"
        onClick={() => onAddCard({ link: card.link, name: card.name })}
      />

      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <button
          type="button"
          className={`element__button-like ${
            isLiked ? "element__button-like_active" : ""
          }`}
          onClick={() => onCardLike(card)}
        />
        <span className="element__counter">{card.likes.length}</span>
      </div>
    </>
  );
}

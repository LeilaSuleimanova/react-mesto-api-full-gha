import { useContext } from "react";
import Card from "./Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onAddCard,
  onDelete,
  card,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile section">
        <div className="profile__container">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__info-content">
              <h1 className="profile__title">
                {currentUser.name ? currentUser.name : ""}
              </h1>
              <button
                aria-label="button"
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__subtitle">
              {currentUser.about ? currentUser.about : ""}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section aria-label="Галерея карточек" className="gallery">
        <ul className="elements section">
          {card.map((data) => {
            return (
              <li className="element" key={data._id}>
                <Card
                  card={data}
                  onAddCard={onAddCard}
                  onDelete={onDelete}
                  onCardLike={onCardLike}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

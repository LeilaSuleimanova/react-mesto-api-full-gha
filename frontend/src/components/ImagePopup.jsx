export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_background ${isOpen && "popup_opened"}`}
      id="popup-image"
      onClick={onClose}
    >
      <div
        className="popup__image-container section"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={card.link ? card.link : "#"}
          alt={card.name ? `${card.name}` : "#"}
          className="popup__image"
        />
        <p className="popup__image-title">{card.name}</p>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

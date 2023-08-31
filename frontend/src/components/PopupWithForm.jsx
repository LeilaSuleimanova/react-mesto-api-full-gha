export default function PopupWithForm({
  name,
  title,
  popupButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__container section"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="сlose"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
          <button
            className={`popup__save-button ${
              name === "popup-delete" ? "popup__save-button_delete" : ""
            } ${isValid ? "" : "popup__save-button_invalid"}`}
            type="submit"
          >
            {popupButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

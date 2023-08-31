import useFormValidation from "../hooks/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, error, isValid, handleChange, reset } = useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="popup-addCard"
      title="Новое место"
      popupButton="Создать"
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        minLength={2}
        maxLength={30}
        className="popup__input popup__input_type_title"
        name="title"
        type="text"
        placeholder="Название"
        required=""
        value={values.title ? values.title : ""}
        onChange={handleChange}
      />
      <span id="title-error" className="popup__error">
        {error.title}
      </span>
      <input
        id="link"
        className="popup__input popup__input_type_url"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required=""
        value={values.link ? values.link : ""}
        onChange={handleChange}
      />
      <span id="link-error" className="popup__error">
        {error.link}
      </span>
    </PopupWithForm>
  );
}

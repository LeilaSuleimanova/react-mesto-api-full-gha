import { useRef } from "react";
import useFormValidation from "../hooks/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputValue = useRef();
  const { values, error, isValid, handleChange, reset } = useFormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar: inputValue.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      isValid={isValid}
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputValue}
        id="avatar"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required=""
        value={values.avatar ? values.avatar : ""}
        onChange={handleChange}
      />
      <span id="avatar-error" className="popup__error">
        {error.avatar}
      </span>
    </PopupWithForm>
  );
}

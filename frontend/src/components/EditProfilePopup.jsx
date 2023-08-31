import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation.js";
import PopupWithForm from "./PopupWithForm.jsx";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, error, isValid, handleChange, reset, setValue } =
    useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("info", currentUser.about);
  }, [currentUser, setValue]);

  function resetAfterClose() {
    onClose();
    reset({ name: currentUser.name, info: currentUser.about });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({ name: values.name, info: values.info }, reset);
  }

  return (
    <PopupWithForm
      name="popup-profileEdit"
      title="Редактировать профиль"
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        minLength={2}
        maxLength={40}
        required=""
        className="popup__input popup__input_type_name"
        name="name"
        type="text"
        value={values.name ? values.name : ""}
        onChange={handleChange}
      />
      <span id="name-error" className="popup__error">
        {error.name}
      </span>
      <input
        id="info"
        minLength={2}
        maxLength={200}
        required=""
        className="popup__input popup__input_type_info"
        name="info"
        type="text"
        value={values.info ? values.info : ""}
        onChange={handleChange}
      />
      <span id="info-error" className="popup__error">
        {error.info}
      </span>
    </PopupWithForm>
  );
}

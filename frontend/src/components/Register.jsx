import useFormValidation from "../hooks/useFormValidation";
import { Link } from "react-router-dom";
import React from "react";

export default function Register({ handleRegister }) {
  const { values, error, handleChange, reset } = useFormValidation();

  function handleSubmit(event) {
    event.preventDefault();
    handleRegister({ email: values.email, password: values.password }, reset);
  }

  return (
    <div className="log-in section">
      <h2 className="log-in__title">Регистрация</h2>
      <form className="log-in__form" onSubmit={handleSubmit}>
        <input
          id="email"
          minLength={2}
          required
          className="popup__input log-in__input"
          name="email"
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder={"Email"}
        />
        <span id="email-error" className="popup__error">
          {error.email}
        </span>
        <input
          id="password"
          minLength={3}
          required
          className="popup__input log-in__input"
          name="password"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          placeholder={"Пароль"}
        />
        <span id="password-error" className="popup__error">
          {error.password}
        </span>
        <button className="log-in__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link to="/sign-in" className="log-in__register-text">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

import logo from "../images/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ email, logIn, logOut }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleLogInClick = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <header className="header section">
      <img src={logo} alt="Логотип сайта Место" className="header__logo" />
      <div className="header__info">
        {logIn && <div className="header__email">{email}</div>}
        {logIn ? (
          <Link className="header__log-in" onClick={logOut} to="/sign-in">
            Выйти
          </Link>
        ) : (
          <>
            {isSignUp ? (
              <Link
                className="header__log-in"
                to="/sign-in"
                onClick={handleLogInClick}
              >
                {" "}
                Войти
              </Link>
            ) : (
              <Link
                className="header__log-in"
                to="/sign-up"
                onClick={handleLogInClick}
              >
                Регистрация
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { authorization } from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCard, setIsCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [card, setCard] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  const [logIn, setLogIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isCorrectLogIn, setIsCorrectLogIn] = useState(false);
  const navigate = useNavigate();

  const setStatesClosePopup = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, []);

  const closePopupsByEsc = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setStatesClosePopup();
        document.removeEventListener("keydown", closePopupsByEsc);
      }
    },
    [setStatesClosePopup]
  );

  const closePopup = useCallback(() => {
    setStatesClosePopup();
    document.removeEventListener("keydown", closePopupsByEsc);
  }, [setStatesClosePopup, closePopupsByEsc]);

  function setEventListenerDocument() {
    document.addEventListener("keydown", closePopupsByEsc);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerDocument();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerDocument();
  }

  function handleCardClick(card) {
    setIsCard(card);
    setIsImagePopupOpen(true);
    setEventListenerDocument();
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEventListenerDocument();
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem("jwt");
      authorization
        .getToken(token)
        .then((res) => {
          if (res) {
            setLogIn(true);
            navigate("/");
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => console.error(err));
    };
    tokenCheck();
  }, [navigate]);

  useEffect(() => {
    logIn &&
      Promise.all([api.getData(), api.getInitialCards()])
        .then(([infoUser, infoCard]) => {
          setCurrentUser(infoUser);
          setCard(infoCard);
          infoCard.forEach((item) => (item.myId = infoUser._id));
        })
        .catch((err) => console.error(err));
  }, [logIn]);

  function handleCardDelete(event) {
    event.preventDefault();
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCard(
          card.filter((element) => {
            return element._id !== deleteCardId;
          })
        );
        closePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closePopup();
        reset();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closePopup();
        reset();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addNewCard(dataCard)
      .then((res) => {
        setCard([res, ...card]);
        closePopup();
        reset();
      })
      .catch((err) => console.error(err));
  }

  function handleRegister(values) {
    const { email, password } = values;
    authorization
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsCorrectLogIn(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsCorrectLogIn(false);
        console.error(err);
      });
  }

  function handleLogin({ email, password }) {
    authorization
      .authorize(email, password)
      .then(() => {
        setUserEmail(email);
        setLogIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsInfoTooltipOpen(true);
        setIsCorrectLogIn(false);
      });
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLogIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} logIn={logIn} logOut={handleLogOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                logIn={logIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleCardClick}
                onDelete={handleDeleteClick}
                onCardLike={handleCardLike}
                card={card}
              />
            }
          />
          <Route
            path="sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="sign-in" element={<Login handleLogin={handleLogin} />} />
          <Route path="/*" element={<Navigate to="/sign-in" />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closePopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closePopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="popup-delete"
          title="Вы уверены ?"
          popupButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closePopup}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          card={isCard}
          isOpen={isImagePopupOpen}
          onClose={closePopup}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          isCorrect={isCorrectLogIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

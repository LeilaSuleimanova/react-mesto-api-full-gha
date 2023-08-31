import correct from "../images/correct.png";
import error from "../images/error.png";

export default function InfoTooltip({ isOpen, onClose, isCorrect }) {
  return (
    <div
      className={`popup info-tooltip ${isOpen && "popup_opened"}`}
      name="infoTooltip"
    >
      <img
        className="info-tooltip__image"
        src={isCorrect ? correct : error}
        alt={
          isCorrect
            ? "Вы успешно зарегистрировались"
            : "Ошибка в регистрации пользователя"
        }
      />
      <button type="button" className="popup__close" onClick={onClose} />
    </div>
  );
}

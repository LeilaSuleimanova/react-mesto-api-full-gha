import { useCallback, useState } from "react";


export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [error, setError] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [inputValid, setImputValid] = useState({})

  function handleChange(event) {

    const name = event.target.name;
    const value = event.target.value;
    const validationText = event.target.validationMessage;
    const valid = event.target.validity.valid;
    const form = event.target.form;


    setValues((element) => {
      return { ...element, [name]: value };
    });

    setError((element) => {
      return { ...element, [name]: validationText };
    });

    setIsValid((element) => {
      return { ...element, [name]: valid };
    });

    setImputValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data)
    setError({})
    setIsValid(false)
    setImputValid({})
  }

  const setValue = useCallback((name, value) => {
    setValues((element) => {
      return { ...element, [name]: value };
    })
  }, [])

  return { values, error, isValid, inputValid, handleChange, reset, setValue };
}

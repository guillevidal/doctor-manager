const initialState = {
  loading: false,
  value: "",
  patient: {
    name: "",
    surname: "",
    phone_number: "",
    medical_insurance: "",
    age: "",
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query }
    case "FINISH_SEARCH":
      return { ...state, loading: false, patient: { ...action.query } }

    default:
      return state
  }
}

export default reducer

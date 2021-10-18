const initialState = {
  loading: false,
  value: "",
  catalogue: [],
  patient: {
    info_personal: {
      name: "...",
      surname: "",
      dni: "...",
      birthdate: { seconds: "..." },
      address: "...",
      phone_number: "...",
    },
    medical_record: {
      general_practitioner: "...",
      general_practitioner_phone: "...",
      medical_treatment: "...",
      allergies: "...",
      affections: [],
      tooth_info: "...",
    },
    health_insurance: {
      health_insurance: "...",
      health_insurance_cod: "...",
    },
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
    case "CATALOGUE":
      return { ...state, catalogue: [...action.query] }

    default:
      return state
  }
}

export default reducer

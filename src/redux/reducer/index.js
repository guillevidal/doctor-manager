const initialState = {
  loading: false,
  value: "",
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
      general_practitioner: "general_practitioner",
      general_practitioner_phone: "general_practitioner_phone",
      medical_treatment: "medical_treatment",
      allergies: "allergies",
      affections: "affectionsArr",
      tooth_info: "tooth_info",
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

    default:
      return state
  }
}

export default reducer

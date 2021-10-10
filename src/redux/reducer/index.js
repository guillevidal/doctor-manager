const initialState = { loading: false, results: [], value: "" }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query }
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.query }
    case "UPDATE_SELECTION":
      return { ...state, value: action.query }

    default:
      return state
  }
}

export default reducer

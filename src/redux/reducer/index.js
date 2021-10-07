const initialState = { loading: false, results: [], value: "" }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query }
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results }
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

export default reducer

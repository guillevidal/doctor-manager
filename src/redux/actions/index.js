export function cleanQuery() {
  return {
    type: "CLEAN_QUERY",
  }
}

export function startSearch(data) {
  return {
    type: "START_SEARCH",
    query: data,
  }
}

export function finishSearch(data) {
  return {
    type: "FINISH_SEARCH",
    query: data.value,
  }
}

export function updateSelection(data) {
  return {
    type: "UPDATE_SELECTION",
    query: data.value,
  }
}

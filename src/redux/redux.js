import { combineReducers, createStore } from "redux";

//actions
export const storeResults = (results) => ({
  type: "STORE_RESULTS",
  results,
});

export const appendResults = (results) => ({
  type: "APPEND_RESULTS",
  results,
});

export const clearResults = () => ({
  type: "CLEAR_RESULTS",
});

//reducer
export const results = (state = [], action) => {
  switch (action.type) {
    case "STORE_RESULTS":
      return action.results;
    case "APPEND_RESULTS":
      let results = [...state]; // we're destructuring `state` inside of array, essentially assigning the elements to a new array.
      results = results.concat(action.results);
      console.log(results);
      return results;
    case "CLEAR_RESULTS":
      return [];
    default:
      return state;
  }
};

export const reducers = combineReducers({
  results,
});

// store
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();

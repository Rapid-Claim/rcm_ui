import { GET_ICD_10_CODES_SUCCESS, GET_ICD_10_CODES_FAIL } from "./actionTypes"

const INIT_STATE = {
  codes: [],
  error: {},
}

const codes = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ICD_10_CODES_SUCCESS:
      return {
        ...state,
        codes: action.payload,
      }

    case GET_ICD_10_CODES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default codes

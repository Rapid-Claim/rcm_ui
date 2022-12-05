import { GET_ICD_10_CODES, GET_ICD_10_CODES_SUCCESS, GET_ICD_10_CODES_FAIL } from "./actionTypes"

export const getICD10Codes = message => ({
  type: GET_ICD_10_CODES,
  message
})

export const getICD10CodesSuccess = codes => ({
  type: GET_ICD_10_CODES_SUCCESS,
  payload: codes,
})

export const getICD10CodesFail = error => ({
  type: GET_ICD_10_CODES_FAIL,
  payload: error,
})

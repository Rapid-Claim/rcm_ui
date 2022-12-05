import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_ICD_10_CODES } from "./actionTypes"
import { getICD10CodesSuccess, getICD10CodesFail } from "./actions"

//Include Both Helper File with needed methods
import { getICD10Codes } from "helpers/fakebackend_helper"

function* fetchCodes({message}) {
  try {
    const response = yield call(getICD10Codes, message)
    yield put(getICD10CodesSuccess(response))
  } catch (error) {
    yield put(getICD10CodesFail(error))
  }
}

function* codesSaga() {
  yield takeEvery(GET_ICD_10_CODES, fetchCodes)
}

export default codesSaga

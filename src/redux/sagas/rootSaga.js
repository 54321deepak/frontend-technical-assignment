import { all } from "redux-saga/effects";
import { watchProductSagas } from "./productSaga";
export default function* rootSaga() {
  yield all([watchProductSagas()]);
}

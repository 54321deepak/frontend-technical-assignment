import { call, put, takeLatest, all } from "redux-saga/effects";
import * as api from "../../services/api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../slices/productSlice";
function* fetchProductsSaga(action) {
  try {
    const { limit, skip, category, query } = action.payload || {};
    let data;
    if (query) {
      data = yield call(api.searchProducts, query, limit, skip);
    } else if (category && category !== "all") {
      data = yield call(api.getProductsByCategory, category, limit, skip);
    } else {
      data = yield call(api.getProducts, limit, skip);
    }
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}
function* fetchCategoriesSaga() {
  try {
    const data = yield call(api.getCategories);
    yield put(fetchCategoriesSuccess(data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}
export function* watchProductSagas() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesSaga);
}

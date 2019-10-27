import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { singInSuccess, singFailure } from './actions';

import history from '~/services/history';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador');
    }

    yield put(singInSuccess(token, user));

    history.push('/dashboard');
  } catch (e) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(singFailure());
  }
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);

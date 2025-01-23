import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { getUserProfile } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearError } from '../../store/userSlice';

import styles from './singIn.module.scss';

type FormValues = {
  email: string;
  password: string;
};

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const error = useAppSelector((state) => state.user.error);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const onSubmit = (data: FormValues) => {
    dispatch(getUserProfile(data));
  };
  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <div className={styles.form}>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} onChange={() => dispatch(clearError())}>
        <label className={styles.label}>
          Email address
          <input
            className={styles.input}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: /^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.email && <p className={styles.errorMessage}>Указанный email некорректен</p>}
        </div>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.password && <p className={styles.errorMessage}>{errors?.password.message}</p>}
        </div>
        <div style={{ height: 30 }}>
          {error && getValues('password') !== '' && <p className={styles.errorMessage}>Неверные логин или пароль</p>}
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.text}>
        Don’t have an account?
        <Link to="/sign-up" style={{ textDecoration: 'none' }}>
          <span className={styles.sign}> Sign Up.</span>
        </Link>
      </p>
    </div>
  );
};
export default SignInPage;

import React from 'react';
import { useForm } from 'react-hook-form';

import styles from '../sign-in/singIn.module.scss';

type FormValues = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

const EditProfilePage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Edit Profile</h1>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Username
          <input
            className={styles.input}
            placeholder="Username"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.username && <p className={styles.errorMessage}>{errors?.username.message}</p>}
        </div>
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
          {errors?.email && (
            <p className={styles.errorMessage}>{errors?.email?.message || 'Указанный email некорректен'}</p>
          )}
        </div>
        <label className={styles.label}>
          New Password
          <input
            className={styles.input}
            placeholder="New Password"
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Пароль должен содержать от 6 до 40 симоволов',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен содержать от 6 до 40 симоволов',
              },
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.password && <p className={styles.errorMessage}>{errors?.password.message}</p>}
        </div>
        <label className={styles.label}>
          Avatar image (url)
          <input
            className={styles.input}
            placeholder="Avatar image"
            {...register('avatar', {
              validate: {
                isValidateURLImage: (value) => {
                  return new Promise((resolve) => {
                    const img = new Image();
                    img.src = value;
                    img.onload = () => {
                      resolve(true);
                    };
                    img.onerror = () => {
                      resolve(false);
                    };
                  });
                },
              },
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.avatar && <p className={styles.errorMessage}>Неверный url-адрес изображения</p>}
        </div>
        <button type="submit" className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
};
export default EditProfilePage;

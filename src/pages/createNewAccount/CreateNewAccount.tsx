import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearError } from '../../store/userSlice';

import styles from './createNewAccount.module.scss';

type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: boolean;
};

const CreateNewAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [isValidate, setIsValidate] = useState(false);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  useEffect(() => {
    dispatch(clearError());
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit = (data: FormValues) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(user)).then(() => navigate('/'));
    // if (errorMessage) {
    //   setIsValidate(false);
    // } else setIsValidate(true);
  };
  // isValidate ? (
  //     <Navigate to="/sign-in" />
  //   ) : (
  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Create new account</h1>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)} onChange={() => dispatch(clearError())}>
        <label className={styles.label}>
          Username
          <input
            className={styles.input}
            placeholder="Username"
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 3,
                message: 'Имя должно содержать от 3 до 20 симоволов',
              },
              maxLength: {
                value: 20,
                message: 'Имя должно содержать от 3 до 20 симоволов',
              },
              pattern: /^[a-zA-Z]+$/,
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errorMessage === 'Имя пользователя занято' && <p className={styles.errorMessage}>{errorMessage}</p>}
          {errors?.username && (
            <p className={styles.errorMessage}>
              {errors?.username.message ||
                'Имя может состоять только из букв латинского алфавита без пробелов и иных символов'}
            </p>
          )}
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
          {errorMessage === 'Пользователь с таким email уже зарегистрирован' && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          {errors?.email && <p className={styles.errorMessage}>Указанный email некорректен</p>}
        </div>
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            placeholder="Password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
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
          Repeat Password
          <input
            className={styles.input}
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Поле обязательно для заполнения',
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
          {getValues('password') !== getValues('repeatPassword') && (
            <p className={styles.errorMessage}>Повторный пароль не совпадает c указанным ранее</p>
          )}
        </div>
        <label className={styles.labelAgree}>
          <input
            type="checkbox"
            {...register('agreement', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          I agree to the processing of my personal information
        </label>
        <div style={{ height: 30 }}>
          {errors?.agreement && (
            <p className={styles.errorMessage}>Необходимо дать согласие на обработку персональных данных</p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
      <p className={styles.text}>
        Already have an account?{' '}
        <Link to="/sign-in" style={{ textDecoration: 'none' }}>
          <span className={styles.sign}>Sign In.</span>
        </Link>
      </p>
    </div>
  );
};
export default CreateNewAccount;

// const CreateNewAccount: React.FC = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     reset,
//     getValues,
//   } = useForm<FormValues>({
//     mode: 'onBlur',
//   });

//   const onSubmit = (data: FormValues) => {
//     const user = {
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       // image: 'null',
//       // bio: '',
//     };
//     registerUser(user);
//     // alert(JSON.stringify(data));
//     reset();
//   };
//   return (
//     <div className={styles.form}>
//       <h1 className={styles.title}>Create new account</h1>
//       <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
//         <label className={styles.label}>
//           Username
//           <input
//             className={styles.input}
//             placeholder="Username"
//             {...register('username', {
//               required: 'Поле обязательно для заполнения',
//               minLength: {
//                 value: 3,
//                 message: 'Имя должно содержать от 3 до 20 симоволов',
//               },
//               maxLength: {
//                 value: 20,
//                 message: 'Имя должно содержать от 3 до 20 симоволов',
//               },
//             })}
//           />
//         </label>
//         <div style={{ height: 30 }}>
//           {errors?.username && <p className={styles.errorMessage}>{errors?.username.message}</p>}
//         </div>
//         <label className={styles.label}>
//           Email address
//           <input
//             className={styles.input}
//             placeholder="Email address"
//             {...register('email', {
//               required: 'Поле обязательно для заполнения',
//               pattern: /^[a-z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//             })}
//           />
//         </label>
//         <div style={{ height: 30 }}>
//           {errors?.email && <p className={styles.errorMessage}>Указанный email некорректен</p>}
//         </div>
//         <label className={styles.label}>
//           Password
//           <input
//             className={styles.input}
//             placeholder="Password"
//             {...register('password', {
//               required: 'Поле обязательно для заполнения',
//               minLength: {
//                 value: 6,
//                 message: 'Пароль должен содержать от 6 до 40 симоволов',
//               },
//               maxLength: {
//                 value: 40,
//                 message: 'Пароль должен содержать от 6 до 40 симоволов',
//               },
//             })}
//           />
//         </label>
//         <div style={{ height: 30 }}>
//           {errors?.password && <p className={styles.errorMessage}>{errors?.password.message}</p>}
//         </div>
//         <label className={styles.label}>
//           Repeat Password
//           <input
//             className={styles.input}
//             placeholder="Password"
//             {...register('repeatPassword', {
//               required: 'Поле обязательно для заполнения',
//               minLength: {
//                 value: 6,
//                 message: 'Пароль должен содержать от 6 до 40 симоволов',
//               },
//               maxLength: {
//                 value: 40,
//                 message: 'Пароль должен содержать от 6 до 40 симоволов',
//               },
//             })}
//           />
//         </label>
//         <div style={{ height: 30 }}>
//           {getValues('password') !== getValues('repeatPassword') && (
//             <p className={styles.errorMessage}>Повторный пароль не совпадает c указанным ранее</p>
//           )}
//         </div>
//         <label className={styles.labelAgree}>
//           <input
//             type="checkbox"
//             {...register('agreement', {
//               required: 'Поле обязательно для заполнения',
//             })}
//           />
//           I agree to the processing of my personal information
//         </label>
//         <div style={{ height: 30 }}>
//           {errors?.agreement && (
//             <p className={styles.errorMessage}>Необходимо дать согласие на обработку персональных данных</p>
//           )}
//         </div>
//         <button type="submit" className={styles.button}>
//           Create
//         </button>
//       </form>
//       <p className={styles.text}>
//         Already have an account?{' '}
//         <Link to="/sign-in" style={{ textDecoration: 'none' }}>
//           <span className={styles.sign}>Sign In.</span>
//         </Link>
//       </p>
//     </div>
//   );
// };
// export default CreateNewAccount;

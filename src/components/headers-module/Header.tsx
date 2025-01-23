import { Link } from 'react-router-dom';

import avatar from '../../file/avatar.svg';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store/userSlice';

import styles from './header.module.scss';

export const Header = () => {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.userProfile);
  return isLogin ? (
    <div className={styles.header}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className={styles.tittle}>Realworld Blog</span>
      </Link>
      <section className={styles.buttonContainer}>
        <Link to="/new-article" style={{ textDecoration: 'none' }} className={[styles.button, styles.active].join(' ')}>
          Create article
        </Link>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div className={styles.author}>
            <span className={styles.name}>{currentUser.username}</span>
            <img className={styles.avatar} src={currentUser.image || avatar} />
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: 'none' }} className={styles.button} onClick={() => dispatch(logOut())}>
          Log Out
        </Link>
      </section>
    </div>
  ) : (
    <div className={styles.header}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span className={styles.tittle}>Realworld Blog</span>
      </Link>
      <section className={styles.buttonContainer}>
        <Link to="/sign-in" style={{ textDecoration: 'none' }}>
          <button className={[styles.button, styles.signIn].join(' ')}>Sign In</button>
        </Link>
        <Link to="/sign-up" style={{ textDecoration: 'none' }}>
          <button className={[styles.button, styles.activeSign].join(' ')}>Sign Up</button>
        </Link>
      </section>
    </div>
  );
};

// export const Header = () => {
//   const isLogin = useAppSelector((state) => state.user.isLogin);
//   // localStorage.setItem('isLogin', `${isLogin}`);
//   // const isLogin = localStorage.getItem('token') ? true : false;
//   // const currentUser = useAppSelector((state) => state.user.userProfile);
//   const dispatch = useAppDispatch();
//   // const currentUser = JSON.parse(localStorage.getItem('user'));
//   const currentUser = useAppSelector((state) => state.user.userProfile);
//   console.log(currentUser);
//   //getCurrentUser();
//   // useEffect(() => {
//   //   dispatch(get(currentUser.username));
//   // }, []);
//   // if (isLogin) {
//   //   dispatch(get(currentUser.username));
//   // }

//   //const current = useAppSelector((state) => state.user.userProfile);
//   //console.log(current);
//   return isLogin ? (
//     <div className={styles.header}>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <span className={styles.tittle}>Realworld Blog</span>
//       </Link>
//       <section className={styles.buttonContainer}>
//         <Link to="/" style={{ textDecoration: 'none' }} className={[styles.button, styles.active].join(' ')}>
//           Create article
//         </Link>
//         <Link to="/profile" style={{ textDecoration: 'none' }}>
//           <div className={styles.author}>
//             <span className={styles.name}>{currentUser.username}</span>
//             <img className={styles.avatar} src={currentUser.image || avatar} />
//           </div>
//         </Link>
//         <Link to="/" style={{ textDecoration: 'none' }} className={styles.button} onClick={() => dispatch(logOut())}>
//           Log Out
//         </Link>
//       </section>
//     </div>
//   ) : (
//     <div className={styles.header}>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <span className={styles.tittle}>Realworld Blog</span>
//       </Link>
//       <section className={styles.buttonContainer}>
//         <Link to="/sign-in" style={{ textDecoration: 'none' }}>
//           <button className={[styles.button, styles.signIn].join(' ')}>Sign In</button>
//         </Link>
//         <Link to="/sign-up" style={{ textDecoration: 'none' }}>
//           <button className={[styles.button, styles.activeSign].join(' ')}>Sign Up</button>
//         </Link>
//       </section>
//     </div>
//   );
// };

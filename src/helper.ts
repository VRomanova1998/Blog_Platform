import { createAsyncThunk } from '@reduxjs/toolkit';

import { FormValues } from './pages/edit-profile/EditProfilePage';
import { DataArticle, TypeArticle } from './pages/create-new-article/CreateNewArticle';
import store from './store';

export const getArticlesList = createAsyncThunk('articles/articlesList', async (currentPage: number) => {
  try {
    const offset = 5 * (currentPage - 1);
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/?limit=5&offset=${offset}`);
    const json = await response.json();
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const getOneArticle = createAsyncThunk('currentArticle/article', async (id?: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`);
    const json = await response.json();
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
});

type LogInData = {
  email: string;
  password: string;
};

export const getUserProfile = createAsyncThunk('userLogIn/user', async (data: LogInData) => {
  try {
    const user = {
      user: { ...data },
    };
    const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error();
    const json = await response.json();
    return json.user;
  } catch (err) {
    return Promise.reject(err);
  }
});

type RegisterData = {
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;
};

export const registerUser = createAsyncThunk('register/user', async (data: RegisterData) => {
  try {
    const user = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        bio: data.bio || '',
        image: data.image || 'null',
      },
    };
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    if (json.errors.username === 'is already taken.') {
      throw new Error('Имя пользователя занято');
    }
    if (json.errors.email === 'is already taken.') {
      throw new Error('Пользователь с таким email уже зарегистрирован');
    }
    return json;
  } catch (err) {
    return Promise.reject(err.message);
  }
});

export const updateCurrentUser = createAsyncThunk('userUpdate/user', async (data: FormValues) => {
  try {
    const user = {
      user: { ...data },
    };
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    return json.user;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const get = createAsyncThunk('currentUser/user', async (username: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/profiles/${username}`);
    const json = await response.json();
    return json.profile;
  } catch (err) {
    console.log('ошибочка вышла');
    return Promise.reject(err);
  }
});

export const createArticle = async (data: TypeArticle, token?: string) => {
  try {
    const article = {
      article: { ...data },
    };
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error();
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    // return Promise.reject(err);
  }
};

export const fetchDeleteArticle = async (token: string, slug: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) throw new Error();
  } catch (err) {
    console.log(err);
    // return Promise.reject(err);
  }
};

// export const getArticlesList = createAsyncThunk('articles/articlesList', async (currentPage: number) => {
//   try {
//     const offset = 5 * (currentPage - 1);
//     const response = await fetch(`https://blog-platform.kata.academy/api/articles/?limit=5&offset=${offset}`);
//     const json = await response.json();
//     return json;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// });

// export const getOneArticle = createAsyncThunk('currentArticle/article', async (id?: string) => {
//   try {
//     const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`);
//     const json = await response.json();
//     return json;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// });

// type LogInData = {
//   email: string;
//   password: string;
// };

// export const getUserProfile = createAsyncThunk('userLogIn/user', async (data: LogInData) => {
//   try {
//     const user = {
//       user: { ...data },
//     };
//     const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });
//     if (!response.ok) throw new Error();
//     const json = await response.json();
//     localStorage.setItem('user', JSON.stringify(json.user));
//     return json.user;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// });

// type RegisterData = {
//   username: string;
//   email: string;
//   password: string;
//   image?: string;
//   bio?: string;
// };

// export const registerUser = async (data: RegisterData) => {
//   try {
//     const user = {
//       user: {
//         username: data.username,
//         email: data.email,
//         password: data.password,
//         bio: data.bio || '',
//         image: data.image || 'null',
//       },
//     };
//     console.log(user);
//     const response = await fetch('https://blog-platform.kata.academy/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });
//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// // export const getCurrentUser = async () => {
// //   try {
// //     // const user = {
// //     //   user: { ...data },
// //     // };
// //     // console.log(user);
// //     // console.log('мы внутри запроса', data);
// //     const token = JSON.parse(localStorage.getItem('user')).token;
// //     console.log(token);
// //     const response = await fetch('https://blog-platform.kata.academy/api/user', {
// //       method: 'GET',
// //       headers: {
// //         Authorization: `Token ${token}`,
// //       },
// //     });
// //     if (!response.ok) throw new Error();
// //     const json = await response.json();
// //     console.log(json, 'это данные текущего пользователя');
// //     return json.user;
// //   } catch (err) {
// //     console.log('ошибка');
// //     //return Promise.reject(err);
// //   }
// // };

// export const updateCurrentUser = createAsyncThunk('userUpdate/user', async (data: FormValues) => {
//   try {
//     //console.log(data);
//     const user = {
//       user:
//         data.password === '' ? { ...data, password: JSON.parse(localStorage.getItem('user')).password } : { ...data },
//     };
//     // console.log(JSON.parse(localStorage.getItem('user')).password);
//     // const user = {
//     //   user:
//     //     data.password === '' ? { ...data, password: JSON.parse(localStorage.getItem('user')).password } : { ...data },
//     // };
//     const token = JSON.parse(localStorage.getItem('user')).token;
//     // const token = useAppSelector((state) => state.user.userProfile.token);
//     //console.log(token);
//     console.log('мы внутри запроса на изменение данных', data);
//     const response = await fetch('https://blog-platform.kata.academy/api/user', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(user),
//     });
//     const json = await response.json();
//     console.log(json);
//     localStorage.setItem('user', JSON.stringify(json.user));
//     return json.user;
//   } catch (err) {
//     console.log('ошибочка вышла');
//     return Promise.reject(err);
//   }
// });

// export const get = createAsyncThunk('currentUser/user', async (username: string) => {
//   try {
//     const response = await fetch(`https://blog-platform.kata.academy/api/profiles/${username}`);
//     const json = await response.json();
//     console.log(json);
//     localStorage.setItem('user', JSON.stringify(json.profile));
//     return json.profile;
//   } catch (err) {
//     console.log('ошибочка вышла');
//     return Promise.reject(err);
//   }
// });

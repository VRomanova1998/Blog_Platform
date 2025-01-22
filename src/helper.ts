import { createAsyncThunk } from '@reduxjs/toolkit';

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
    console.log(user);
    console.log('мы внутри запроса', data);
    const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error();
    const json = await response.json();
    console.log(json, 'мы логинимся');
    return json.user;
  } catch (err) {
    return Promise.reject(err);
  }
});

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterData) => {
  try {
    const user = {
      user: { ...data },
    };
    console.log(user);
    console.log('мы внутри запроса', data);
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    // const user = {
    //   user: { ...data },
    // };
    // console.log(user);
    // console.log('мы внутри запроса', data);
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (!response.ok) throw new Error();
    const json = await response.json();
    console.log(json, 'это данные текущего пользователя');
    return json.user;
  } catch (err) {
    console.log('ошибка');
    //return Promise.reject(err);
  }
};

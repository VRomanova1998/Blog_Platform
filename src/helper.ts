import { createAsyncThunk } from '@reduxjs/toolkit';

import { DataProps, EditProfileFormValues, LogInData, RegisterData } from './types/type';

export const getArticlesList = createAsyncThunk(
  'articles/getArticlesList',
  async (data: { currentPage: number; token: string }, { rejectWithValue }) => {
    try {
      const offset = 5 * (data.currentPage - 1);
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/?limit=5&offset=${offset}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${data.token}`,
        },
      });
      if (!response.ok) throw new Error();
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getOneArticle = createAsyncThunk('currentArticle/getOneArticle', async (id?: string) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`);
    const json = await response.json();
    return json;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (data: LogInData) => {
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

export const registerUser = createAsyncThunk('user/register', async (data: RegisterData) => {
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
    if (json.errors) {
      if (json.errors.username === 'is already taken.') {
        throw new Error('Имя пользователя занято');
      }
      if (json.errors.email === 'is already taken.') {
        throw new Error('Пользователь с таким email уже зарегистрирован');
      }
    }
    return json;
  } catch (err) {
    return Promise.reject(err.message);
  }
});

export const updateCurrentUser = createAsyncThunk('user/userUpdate', async (data: EditProfileFormValues) => {
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

export const createArticle = async (data: DataProps, token: string) => {
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
};

export const fetchDeleteArticle = async (token: string, slug: string) => {
  const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) throw new Error();
  return await response.json();
};

export const updateArticle = async (data: DataProps, token: string, id?: string) => {
  try {
    const article = {
      article: { ...data },
    };
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error();
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    return err;
  }
};

export const toLikeArticle = createAsyncThunk(
  'currentArticle/toLike',
  async (data: { token: string; slug: string; method: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog-platform.kata.academy/api/articles/${data.slug}/favorite`, {
        method: `${data.method}`,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      });
      if (!response.ok) throw new Error();
      const json = await response.json();
      return json;
    } catch (err) {
      return rejectWithValue;
    }
  }
);

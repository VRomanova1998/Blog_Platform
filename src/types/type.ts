export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export type DataProps = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  way?: string;
  id?: string;
};

export type DataArticle = {
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
};
export type Tag = {
  value: string;
};

export type FormValues = {
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
  agreement: boolean;
};

export type EditProfileFormValues = {
  username: string;
  email: string;
  password: string;
  image: string;
  bio: string;
  token: string;
};

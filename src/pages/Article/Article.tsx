import Markdown from 'markdown-to-jsx';
import { Alert, Popconfirm, Spin } from 'antd';
import type { PopconfirmProps } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { fetchDeleteArticle, getOneArticle } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Post } from '../../components/post/Post';

import styles from './article.module.scss';

export const ArticlePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.currentArticle.loading);
  const isError = useAppSelector((state) => state.currentArticle.error);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const currentUser = useAppSelector((state) => state.user.userProfile);
  const id = useParams().id;
  useEffect(() => {
    dispatch(getOneArticle(id));
  }, []);
  const currentPost = useAppSelector((state) => state.currentArticle.currentArticle);
  const confirm: PopconfirmProps['onConfirm'] = () => {
    fetchDeleteArticle(currentUser.token, currentPost.slug)
      .then(() => navigate('/'))
      .catch(() => {
        alert('Ошибка запроса на сервер, удаление не удалось');
      });
  };
  if (isError) {
    return <Alert message="Запрашиваемая Вами страница не найдена" type="info" />;
  } else {
    if (isLoading) {
      return <Spin />;
    } else {
      return (
        <div className={styles.articlePage}>
          <Post {...currentPost} isFullArticle={true} />
          {isLogin && currentPost.author.username === currentUser.username && (
            <div className={styles.author}>
              <Popconfirm
                placement="rightTop"
                title="Delete this article"
                description="Are you sure to delete this article?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <button className={styles.deleteButton}>Delete</button>
              </Popconfirm>
              <Link to={`/articles/${id}/edit`} className={styles.editButton} style={{ textDecoration: 'none' }}>
                Edit
              </Link>
            </div>
          )}
          <Markdown>{currentPost.body}</Markdown>
        </div>
      );
    }
  }
};

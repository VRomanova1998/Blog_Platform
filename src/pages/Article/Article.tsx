import Markdown from 'markdown-to-jsx';
import { HeartOutlined } from '@ant-design/icons';
import { Alert, Popconfirm, message, Spin, Tag } from 'antd';
import type { PopconfirmProps } from 'antd';
import { format } from 'date-fns';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { fetchDeleteArticle, getOneArticle } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';

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
  const currentTags = currentPost.tagList.map((item, index) => {
    return (
      <Tag className={styles.tag} key={index}>
        {item}
      </Tag>
    );
  });
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    // console.log(e);
    // deleteArticle();
    fetchDeleteArticle(currentUser.token, currentPost.slug).then(() => navigate('/'));
  };

  // const cancel: PopconfirmProps['onCancel'] = (e) => {
  //   console.log(e);
  // };
  // const deleteArticle = () => {
  //   fetchDeleteArticle(currentUser.token, currentPost.slug).then(() => navigate('/'));
  // };
  const createTime = currentPost.createdAt !== '' ? format(new Date(currentPost.createdAt), 'MMMM dd, yyyy') : '';
  const descriptionPost = currentPost.body;
  if (isError) {
    return <Alert message="Запрашиваемая Вами страница не найдена" type="info" />;
  } else {
    if (isLoading) {
      return <Spin />;
    } else {
      return (
        <div className={styles.articlePage}>
          <div className={styles.postItem}>
            <div className={styles.articleDescription}>
              <div className={styles.test}>
                <span className={styles.title}>{currentPost.title}</span>
                <HeartOutlined />
                <span>{currentPost.favoritesCount}</span>
              </div>
              <div className={styles.tagsContainer}>{currentTags}</div>
              <p className={styles.description}>{currentPost.description}</p>
            </div>
            <div>
              <div className={styles.author}>
                <div className={styles.info}>
                  <span className={styles.name}>{currentPost.author.username}</span>
                  <span className={styles.date}>{createTime}</span>
                </div>
                <img src={currentPost.author.image} className={styles.avatar}></img>
              </div>
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
            </div>
          </div>
          <Markdown>{descriptionPost}</Markdown>
        </div>
      );
    }
  }
};

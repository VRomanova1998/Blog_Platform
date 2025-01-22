/* eslint-disable react/no-children-prop */
import Markdown from 'markdown-to-jsx';
import { HeartOutlined } from '@ant-design/icons';
import { Alert, Spin, Tag } from 'antd';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getOneArticle } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './article.module.scss';

export const ArticlePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.currentArticle.loading);
  const isError = useAppSelector((state) => state.currentArticle.error);
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
            <div className={styles.author}>
              <div className={styles.info}>
                <span className={styles.name}>{currentPost.author.username}</span>
                <span className={styles.date}>{createTime}</span>
              </div>
              <img src={currentPost.author.image} className={styles.avatar}></img>
            </div>
          </div>
          <Markdown children={descriptionPost} />
        </div>
      );
    }
  }
};

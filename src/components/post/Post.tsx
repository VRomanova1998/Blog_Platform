import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import avatar from '../../file/avatar.svg';
import { Article } from '../../types/type';
import { toLikeArticle } from '../../helper';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './post.module.scss';

export const Post = (props: Article) => {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(
    (state) => state.article.articles.find((article) => article.slug === props.slug)?.favoritesCount
  );
  const iLikeIt = useAppSelector(
    (state) => state.article.articles.find((article) => article.slug === props.slug)?.favorited
  );
  const currentUserToken = useAppSelector((state) => state.user.userProfile.token);
  const toLike = () => {
    if (currentUserToken) {
      const data = {
        token: currentUserToken,
        slug: props.slug,
        method: 'POST',
      };
      dispatch(toLikeArticle(data));
    } else {
      alert('Для того чтобы ставить лайки постам, нужно быть авторизованным');
    }
  };
  const deleteLike = () => {
    if (currentUserToken) {
      const data = {
        token: currentUserToken,
        slug: props.slug,
        method: 'DELETE',
      };
      dispatch(toLikeArticle(data));
    } else {
      alert('Для того чтобы ставить лайки постам, нужно быть авторизованным');
    }
  };
  const currentTags = props.tagList.map((item, index) => {
    return (
      <Tag className={styles.tag} key={index}>
        {item}
      </Tag>
    );
  });
  const createTime = props.createdAt !== '' ? format(new Date(props.createdAt), 'MMMM dd, yyyy') : '';
  return (
    <div className={props.isFullArticle ? styles.postArticle : styles.postItem}>
      <div className={props.isFullArticle ? styles.articleDescription : styles.shortArticleDescription}>
        <div className={styles.test}>
          <Link to={`/articles/${props.slug}`} style={{ textDecoration: 'none' }}>
            <span className={props.isFullArticle ? styles.title : styles.shortTitle}>{props.title}</span>
          </Link>
          {iLikeIt ? (
            <HeartFilled onClick={deleteLike} className={styles.heart} />
          ) : (
            <HeartOutlined onClick={toLike} className={styles.heartOutlined} />
          )}
          <span className={styles.likes}>{favoritesCount}</span>
        </div>
        <div className={props.isFullArticle ? styles.tagsContainer : styles.shortTagsContainer}>{currentTags}</div>
        <p className={props.isFullArticle ? styles.description : styles.shortDescription}>{props.description}</p>
      </div>
      <div className={styles.author}>
        <div className={styles.info}>
          <span className={styles.name}>{props.author.username}</span>
          <span className={styles.date}>{createTime}</span>
        </div>
        <img src={props.author.image !== 'null' ? props.author.image : avatar} className={styles.avatar}></img>
      </div>
    </div>
  );
};

import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import { Article } from '../../types/type';

import styles from './post.module.scss';

export const Post = (props: Article) => {
  const currentTags = props.tagList.map((item, index) => {
    return (
      <Tag className={styles.tag} key={index}>
        {item}
      </Tag>
    );
  });
  const createTime = format(new Date(props.createdAt), 'MMMM dd, yyyy');
  return (
    <div className={styles.postItem}>
      <div className={styles.articleDescription}>
        <div className={styles.test}>
          <Link to={`/articles/${props.slug}`} style={{ textDecoration: 'none' }}>
            <span className={styles.title}>{props.title}</span>
          </Link>
          <HeartOutlined />
          <span className={styles.likes}>{props.favoritesCount}</span>
        </div>
        <div className={styles.tagsContainer}>{currentTags}</div>
        <p className={styles.description}>{props.description}</p>
      </div>
      <div className={styles.author}>
        <div className={styles.info}>
          <span className={styles.name}>{props.author.username}</span>
          <span className={styles.date}>{createTime}</span>
        </div>
        <img src={props.author.image} className={styles.avatar}></img>
      </div>
    </div>
  );
};

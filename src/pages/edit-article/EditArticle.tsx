import { useParams } from 'react-router-dom';

import { FormArticle } from '../../components/form-article/FormArticle';
import { useAppSelector } from '../../hooks';

import styles from './editArticle.module.scss';

export const EditArticle = () => {
  const { id } = useParams();
  const currentPost = useAppSelector((state) => state.currentArticle.currentArticle);
  const data = { ...currentPost, way: 'edit', id: id };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit article</h1>
      <FormArticle {...data} />
    </div>
  );
};

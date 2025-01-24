import { FormArticle } from '../../components/form-article/FormArticle';

import styles from './createNewArticle.module.scss';

const CreateNewArticle: React.FC = () => {
  const data = {
    title: '',
    description: '',
    body: '',
    tagList: [''],
    way: 'createNew',
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new article</h1>
      <FormArticle {...data} />
    </div>
  );
};

export default CreateNewArticle;

import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createArticle } from '../../helper';
import { useAppSelector } from '../../hooks';

import styles from './createNewArticle.module.scss';

export type DataArticle = {
  title: string;
  description: string;
  body: string;
  tags: Tag[];
};
export type Tag = {
  value: string;
};

export type TypeArticle = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

const CreateNewArticle: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<DataArticle>({
    defaultValues: {
      tags: [{ value: '' }],
    },
    mode: 'onBlur',
  });
  const navigate = useNavigate();
  const currentToken = useAppSelector((state) => state.user.userProfile.token);

  const onSubmit = (data: DataArticle) => {
    const article = {
      title: data.title,
      body: data.body,
      description: data.description,
      tagList: data.tags.map((tag) => tag.value),
    };
    createArticle(article, currentToken).then(() => navigate('/'));
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new article</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Title
          <input
            className={styles.input}
            placeholder="Title"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.title && <p className={styles.errorMessage}>{errors?.title.message}</p>}
        </div>
        <label className={styles.label}>
          Short description
          <input
            className={styles.input}
            placeholder="Title"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.description && <p className={styles.errorMessage}>{errors?.description.message}</p>}
        </div>
        <label className={styles.label}>
          Text
          <textarea
            className={[styles.input, styles.text].join(' ')}
            placeholder="Text"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
          />
        </label>
        <div style={{ height: 30 }}>
          {errors?.body && <p className={styles.errorMessage}>{errors?.body.message}</p>}
        </div>
        <label>
          Tags
          <div className={styles.tagsContainer}>
            {fields.map((item, index) => (
              <div key={item.id} className={styles.tagSection}>
                <input
                  placeholder="Tag"
                  className={styles.tag}
                  {...register(`tags.${index}.value`)}
                  defaultValue={item.value}
                />
                <button type="button" className={styles.deleteButton} onClick={() => remove(index)}>
                  Delete
                </button>
                {index === fields.length - 1 && (
                  <button type="button" className={styles.addButton} onClick={() => append({ value: '' })}>
                    Add Tag
                  </button>
                )}
              </div>
            ))}
          </div>
        </label>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateNewArticle;

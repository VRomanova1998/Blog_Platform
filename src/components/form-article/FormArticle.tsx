import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import React from 'react';

import { useAppSelector } from '../../hooks';
import { createArticle, updateArticle } from '../../helper';
import { DataArticle, DataProps } from '../../types/type';

import styles from './formArticle.module.scss';

export const FormArticle = (props: DataProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<DataArticle>({
    defaultValues: {
      title: props.title,
      description: props.description,
      body: props.body,
      tagList: props.tagList.map((item) => ({ value: item })),
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
      tagList: data.tagList.map((tag) => tag.value),
    };
    if (props.way === 'createNew') {
      createArticle(article, currentToken).then(() => navigate('/'));
    }
    if (props.way === 'edit') {
      updateArticle(article, currentToken, props.id).then(() => navigate('/'));
    }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Title
          <input
            className={styles.input}
            defaultValue={props.title}
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
            defaultValue={props.description}
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
            defaultValue={props.body}
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
                  {...register(`tagList.${index}.value`)}
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
    </React.Fragment>
  );
};

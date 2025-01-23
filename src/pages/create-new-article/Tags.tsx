import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './createNewArticle.module.scss';

export const Tags = () => {
  const [tagsArray, setTagsArray] = useState([{ id: uuidv4(), value: '' }]);

  const deleteTag = (id: string) => {
    setTagsArray((prevState) => prevState.filter((tag) => tag.id !== id));
  };

  const addTag = () => {
    setTagsArray((prevState) => [...prevState, { id: uuidv4(), value: '' }]);
  };
  const tags = tagsArray.map((item, index) => {
    return (
      <div key={item.id} className={styles.tagSection}>
        <input placeholder="Tag" className={styles.tag}></input>
        <button className={styles.deleteButton} onClick={() => deleteTag(item.id)}>
          Delete
        </button>
        {index === tagsArray.length - 1 && (
          <button className={styles.addButton} onClick={() => addTag()}>
            Add Tag
          </button>
        )}
      </div>
    );
  });
  return <React.Fragment>{tags}</React.Fragment>;
};

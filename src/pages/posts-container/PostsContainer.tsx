import { Alert, Pagination, Spin } from 'antd';
import { useEffect } from 'react';

import { Post } from '../../components/post/Post';
import { getArticlesList } from '../../helper';
import { Article } from '../../types/type';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { changePage } from '../../store/articlesSlice';

import styles from './posts-container.module.scss';

export const PostsContainer = () => {
  const currentPage = useAppSelector((state) => state.article.currentPage);
  const dispatch = useAppDispatch();
  const articlesArray = useAppSelector((state) => state.article.articles);
  const summaryPages = Math.ceil(useAppSelector((state) => state.article.summaryPages));
  const isLoading = useAppSelector((state) => state.article.loading);
  const isError = useAppSelector((state) => state.article.error);
  const currentToken = useAppSelector((state) => state.user.userProfile.token);
  useEffect(() => {
    const data = {
      currentPage: currentPage,
      token: currentToken,
    };
    dispatch(getArticlesList(data));
  }, [currentPage]);
  const articlesList = articlesArray.map((item: Article) => {
    return <Post {...item} key={item.slug} isFullArticle={false} />;
  });
  const onChangePage = (page: number) => {
    dispatch(changePage(page));
  };
  return (
    <div className={styles.container}>
      {isLoading && <Spin size="large" />}
      {isError && <Alert message="Ошибка запроса, попробуйте обновить страницу" type="info" />}
      {!isError && !isLoading && articlesList}
      <Pagination
        align="center"
        defaultCurrent={1}
        current={currentPage}
        total={summaryPages * 10}
        style={{ backgroundColor: 'rgba(235, 238, 243, 1)' }}
        className={styles.create}
        onChange={onChangePage}
        hideOnSinglePage
        showSizeChanger={false}
      />
    </div>
  );
};

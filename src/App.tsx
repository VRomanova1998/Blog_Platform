import { Routes, Route, Link } from 'react-router-dom';

import { Header } from './components/headers-module/Header';
import { PostsContainer } from './components/posts-container/PostsContainer';
import { ArticlePost } from './components/Article/Article';
import { NotFoundPage } from './components/NotFoundPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsContainer />} />
        <Route path="/articles" element={<PostsContainer />} />
        <Route path="/articles/:id" element={<ArticlePost />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

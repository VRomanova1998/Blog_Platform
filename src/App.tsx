import { Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components/headers-module/Header';
import { PostsContainer } from './pages/posts-container/PostsContainer';
import { ArticlePost } from './pages/Article/Article';
import { NotFoundPage } from './pages/not-found-pages/NotFoundPage';
import CreateNewAccount from './pages/createNewAccount/CreateNewAccount';
import SignInPage from './pages/sign-in/SignIn';
import EditProfilePage from './pages/edit-profile/EditProfilePage';
import { RequireAuth } from './hoc/RequireAuth';
import CreateNewArticle from './pages/create-new-article/CreateNewArticle';
import { EditArticle } from './pages/edit-article/EditArticle';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PostsContainer />} />
        <Route path="/articles" element={<Navigate to="/" replace />} />
        <Route path="/articles/:id" element={<ArticlePost />} />
        <Route path="/sign-up" element={<CreateNewAccount />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <CreateNewArticle />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:id/edit"
          element={
            <RequireAuth>
              <EditArticle />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

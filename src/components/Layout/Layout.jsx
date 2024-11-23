import { Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import css from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}

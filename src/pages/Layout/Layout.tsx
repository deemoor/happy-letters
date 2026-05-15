import { Outlet } from 'react-router-dom';
import { Header } from 'src/components';
import cls from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={cls.layout}>
      <Header />
      <main className={cls.content}>
        <Outlet />
      </main>
    </div>
  );
};
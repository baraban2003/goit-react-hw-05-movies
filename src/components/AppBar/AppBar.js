import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation';
import Container from 'components/Container';
import s from './AppBar.module.css';

export default function AppBar() {
  return (
    <>
      <Container>
        <header className={s.header}>
          <Navigation />
        </header>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}

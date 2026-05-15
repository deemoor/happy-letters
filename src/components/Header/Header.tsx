import { Link } from 'react-router-dom'
import { logoIcon } from 'src/assets';
import cls from './Header.module.scss'
 
export const Header = () => {
  return (
    <header className={cls.header}>
      <div className={cls.wrapper}>
        <Link to="/">
          <img src={logoIcon} className={cls.logo} alt="logo" />
        </Link>
      </div>
    </header>
  )
}

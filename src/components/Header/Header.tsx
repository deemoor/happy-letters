import { Link } from 'react-router-dom'
import { logoIcon } from 'src/assets';
import './Header.scss'
 
export const Header = () => {
  return (
    <header className='header'>
      <div className="wrapper">
        <Link to="/">
          <img src={logoIcon} className='logo' alt="logo" />
        </Link>
      </div>
    </header>
  )
}

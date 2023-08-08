
import  { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import NavBar from './NavBar';

const Header = () => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ////////////////////////////////////

  //////
  // console.log(isAuth);



 

  return (
    <header>
      {width > 768 ? 
      (<>
      <NavBar ></NavBar>
      </>
      )
      : <MobileMenu/>}
      
    </header>
  );
};

export default Header;

import { Link, NavLink } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';

import styles from './Header.module.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsAuth,
  checkIsRole,
  logout,
} from '../../store/features/auth/authSlice';
import { carOut } from '../../store/features/car/carSlice';
import { toast } from 'react-toastify';
import MobileMenu from '../layout/MobileMenu';

const Header = () => {
  //получаеть ширину экрана и относительно ширины экрана используем то или иное меню

  const [width, setWidth] = useState(window.innerWidth);
  const { car } = useSelector((state) => state.car);
  const [isHoveredDir, setIsHoveredDir] = useState(false);
  const [isHoveredServ, setIsHoveredServ] = useState(false);

  //////////////////// Hover functions
  const handleMouseEnter = (setFunction) => {
    setFunction(true);
  };

  const handleMouseLeave = (setFunction) => {
    setFunction(false);
  };
  ///////////////////////

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  ////////////////////////////////////

  //////
  const isAuth = useSelector(checkIsAuth);
  // console.log(isAuth);
  const isRole = useSelector(checkIsRole);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи', {
      position: 'bottom-right',
    });
  };

  const takeCarHandler = () => {
    dispatch(carOut());
    setIsHoveredServ(false);
  };
  const addCarRepairHandler = () => {
    // dispatch(carOut());
    setIsHoveredServ(false);
  };

  return (
    <header>
      {width > 768 ? (
        <div className={`container mx-auto ${styles.header}`}>
          <img
            alt="car service"
            src="check-engine.svg"
            className={styles.logo}
          ></img>
          <nav className={`${styles.nav}`}>
            <ul className={styles['ul-main']}>
              {isRole !== 'MASTER' && (
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                  >
                    Головна
                  </NavLink>
                </li>
              )}
              {isAuth && (
                <React.Fragment>
                  {isRole === 'ADMIN' && (
                    <li
                      onMouseEnter={() => handleMouseEnter(setIsHoveredDir)}
                      onMouseLeave={() => handleMouseLeave(setIsHoveredDir)}
                      onMouseMove={() => setIsHoveredDir(true)}
                      className={styles.directory}
                    >
                      <NavLink data-type="directory">Довідники</NavLink>

                      <ul
                        //
                        className={
                          isHoveredDir ? styles['ul-dir-dropdown'] : ' hidden'
                        }
                      >
                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/users"
                          >
                            Користувачі
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/cars"
                          >
                            Автомобілі
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/mainrepair"
                          >
                            Види Ремонту
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/posts"
                          >
                            Мої Статті
                          </Link>
                        </li>

                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/newPost"
                          >
                            Створити статтю
                          </Link>
                        </li>

                        <li>
                          <NavLink
                            onClick={() => setIsHoveredDir(false)}
                            to="/reports"
                          >
                            Звіт
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  )}
                  {(isRole === 'MASTER' || isRole === 'ADMIN') && (
                    <li
                      className={styles.service}
                      onMouseEnter={() => handleMouseEnter(setIsHoveredServ)}
                      onMouseLeave={() => handleMouseLeave(setIsHoveredServ)}
                    >
                      <NavLink data-type="service">Сервіси</NavLink>
                      <ul
                        className={
                          isHoveredServ ? styles['ul-serv-dropdown'] : ' hidden'
                        }
                      >
                        <li>
                          <Link onClick={takeCarHandler} to="/takeacar">
                            Прийняти авто
                          </Link>
                        </li>
                        {car && (
                          <li>
                            <Link
                              onClick={addCarRepairHandler}
                              to="/addcarrepair"
                            >
                              Продовжити ремонт
                            </Link>
                          </li>
                        )}

                        <li>
                          <Link
                            onClick={() => setIsHoveredDir(false)}
                            to="/cars"
                          >
                            Автомобілі
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  {isRole === 'ADMIN' && (
                    <li>
                      <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                          isActive ? styles.active : ''
                        }
                      >
                        Параметри
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              )}

              <li>
                <Link to="/price">Прайс</Link>
              </li>
              {isRole !== 'MASTER' && (
                <Fragment>
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive ? styles.active : ''
                      }
                    >
                      Про нас
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) =>
                        isActive ? styles.active : ''
                      }
                    >
                      Контакти
                    </NavLink>
                  </li>
                </Fragment>
              )}

              <li>
                {isAuth ? (
                  <NavLink
                    to="/out"
                    className={({ isActive }) =>
                      isActive && width < 768 ? styles.active : ''
                    }
                    onClick={logoutHandler}
                  >
                    Вихід
                  </NavLink>
                ) : (
                  <NavLink
                    to={'/login'}
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                  >
                    Вхід
                  </NavLink>
                )}
              </li>
              <li className="">
                <FaUserTie className="mx-auto" />
                {user?.username}
              </li>
            </ul>
          </nav>{' '}
        </div>
      ) : (
        <MobileMenu />
      )}
    </header>
  );
};

export default Header;

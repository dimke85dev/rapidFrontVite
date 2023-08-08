import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink,Link } from 'react-router-dom'
import { checkIsAuth, checkIsRole, logout } from '../../../store/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { carOut } from '../../../store/features/car/carSlice'
import styles from './Header.module.css';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const  NavBar = () => {
  const { car } = useSelector((state) => state.car);
  const [isHoveredDir, setIsHoveredDir] = useState(false);
  const [isHoveredServ, setIsHoveredServ] = useState(false);
  const isAuth = useSelector(checkIsAuth);
  const isRole = useSelector(checkIsRole);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  


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
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  
                  <img
            alt="car service"
            src="check-engine.svg"
            className={`${styles.logo} h-8 w-auto`}
          ></img>
                </div>
                <div className="hidden sm:ml-6 sm:block md:flex">
                  <div className="flex space-x-4 items-center">
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
                <>
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
                          isHoveredDir ? `${styles['ul-dir-dropdown']} bg-gray-800` : ' hidden'
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
                          isHoveredServ ? `${styles['ul-serv-dropdown']} bg-gray-800` : ' hidden'
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
                </>
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

              
            </ul>
          </nav>{' '}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>{user?.username || 'User'}</div>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          isAuth ? (
                            <NavLink
                              to="/out"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={logoutHandler}
                            >
                              Вихід
                            </NavLink>
                          ) : (
                            <NavLink
                              to={'/login'}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Вхід
                            </NavLink>
                          )
                          // <a
                          //   href="#"
                          //   className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          // >
                          //   Sign out
                          // </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
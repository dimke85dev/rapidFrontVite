import { Fragment } from 'react';
import Header from '../UI/Header/Header';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <div className="mx-auto text-center items-center">
        <Header />
        
        <main className={'container ' + styles.main}>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;

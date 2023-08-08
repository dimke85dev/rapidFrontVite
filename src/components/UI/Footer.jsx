import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-gray-800`}>
      <div className={styles.social}>
        <a
          aria-label="facebook"
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          aria-label="Instagram"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          aria-label="twitter"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Rapid Service</p>
    </footer>
  );
};

export default Footer;

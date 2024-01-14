import { useState } from 'react';
import styles from './top-button.module.scss';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export function TopButton() {
  const [showButton, setShowButton] = useState(false);
    
  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
    
  function handleScroll() {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }
    
  window.addEventListener('scroll', handleScroll);
    
  return (
        <button
            className={showButton ? `${styles.topButton}` : `${styles.topButton} ${styles.hidden}`}
            onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
  );
}

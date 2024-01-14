import styles from './code-buttons.module.scss';
import { CodeType } from './code-type.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faBoltLightning, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
export interface CodeButtonsProps {
  codeType?: CodeType,
  onChange: (codeType: CodeType) => void
}

export function CodeButtons(props: CodeButtonsProps) {
  const [hidden, setHidden] = useState<boolean>(false);
    
  //   If scroll is greater than 100, hide the buttons
    
  const handleScroll = () => {
    const scroll = window.scrollY;
    if (scroll > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  };
    
  window.addEventListener('scroll', handleScroll);
    
    
  return (
    <div className={`${styles.codeButtons} ${hidden ? styles.hidden : ''}`}>
      {/*  On Hover show tooltip*/}
      <button 
          className={`${styles.codeButton} ${props.codeType === CodeType.Freeze ? styles.active : ''}`}
          onClick={() => props.onChange(props.codeType == CodeType.Freeze ? CodeType.Regular : CodeType.Freeze)}
          title={'Code Freeze'}
      >
          <FontAwesomeIcon icon={faSnowflake} />
      </button>
      <button
          className={`${styles.codeButton} ${props.codeType === CodeType.Crunch ? styles.active : ''}`} 
          onClick={() => props.onChange(props.codeType == CodeType.Crunch ? CodeType.Regular : CodeType.Crunch)}
          title={'Crunch!!'}
      >
            <FontAwesomeIcon icon={faBoltLightning} />
      </button>
    {/*  Restart */}
        <button
            className={`${styles.codeButton}`}
            onClick={() => props.onChange(CodeType.Reload)}
            title={'Restart'}
        >
            <FontAwesomeIcon icon={faRefresh} />
        </button>
    </div>
  );
}

import { MyInfo } from '../components/my-info/my-info.tsx';
import { Experiences } from '../components/experiences/experiences.tsx';
import { Skills } from '../components/skills/skills.tsx';
import { BackgroundCode } from '../components/background-code/background-code.tsx';
import styles from './home.module.scss';
import { Projects } from '../components/projects/projects.tsx';
import { CodeButtons } from '../components/background-code/code-buttons.tsx';
import { useState } from 'react';
import { CodeType } from '../components/background-code/code-type.ts';
import { Contact } from '../components/contact/contact.tsx';
import { Footer } from './footer.tsx';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

export function Home() {
  const [codeType, setCodeType] = useState(CodeType.Regular);
    
  const changeCodeType = (ct: CodeType) => {
    setCodeType(ct);
  };
  
  const onReloaded = () => {
    setCodeType(CodeType.Regular);
  };
    
  return (
      <>
        <SpeedInsights />
        <Analytics />
        <div className={styles.mainContent}>
            <CodeButtons onChange={changeCodeType} codeType={codeType} />
            <BackgroundCode codeType={codeType} onReloaded={onReloaded}  />
            <MyInfo />
            <Skills />
            <Experiences />
            <Projects />
            <Contact />
            <Footer />
        </div>
      </>
  );
}

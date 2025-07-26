import { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './background-code.module.css';

import { CodeType } from './code-type.ts';
import { OptimizedHighlighter } from './optimized-highlighter.tsx';

interface BackgroundCodeProps {
  codeType?: CodeType;
  onReloaded: () => void;
}

const BaseTypingSpeed = 200;

export function BackgroundCode(props: BackgroundCodeProps) {
  const [code, setCode] = useState<string>('');
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);

  const loadCodeFile = async (path: string) => {
    const response = await fetch(path);
    const text = await response.text();
    setLines(text.split('\n'));
    setCode('');
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  };


  let codeTypingSpeed: number;

  switch (props.codeType) {
    case CodeType.Freeze:
      codeTypingSpeed = 1500;
      break;
    case CodeType.Crunch:
      codeTypingSpeed = 20;
      break;
    case CodeType.Reload:
      codeTypingSpeed = BaseTypingSpeed;
      void loadCodeFile('/Equipment.cpp');
      props.onReloaded();
      break;
    default:
      codeTypingSpeed = BaseTypingSpeed;
      break;
  }

  useEffect(() => {
    void loadCodeFile('/Equipment.cpp');
  }, []);

  useEffect(() => {
    let isCancelled = false;

    if (props.codeType === CodeType.Reload) {
      isCancelled = true;
      return;
    }

    const typeLine = async (line: string) => {
      for (let i = currentCharIndex; i < line.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        await new Promise((resolve) => {
          const timeout = setTimeout(() => {
            if (!isCancelled) {
              setCode((prevCode) => `${prevCode}${line[i]}`);
              setCurrentCharIndex(i + 1); // Update the character index
              resolve(true);
            }
          }, Math.floor(Math.random() * codeTypingSpeed));

          if (isCancelled) {
            clearTimeout(timeout);
            resolve(true);
          }
        });
      }
      if (!isCancelled) {
        setCode((prevCode) => `${prevCode}\n`);
        setCurrentLineIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0); // Reset the character index for the next line
      }
    };

    if (currentLineIndex < lines.length) {
      void typeLine(lines[currentLineIndex]);
    }

    return () => {
      isCancelled = true;
    };
  }, [currentLineIndex, lines, codeTypingSpeed, currentCharIndex]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 500], [0.3, 0.1]);

  return (
        <motion.div 
            className={`${styles.backgroundCode} ${styles.parallaxLayer} ${styles.parallaxBack}`}
            style={{ y, opacity }}
        >
            <Suspense fallback={<div className={styles.loadingCode}>Loading code...</div>}>
                <OptimizedHighlighter
                    language="cpp"
                    className={`${styles.hljs} ${styles.highlight} language-cpp`}>
                    {code}
                </OptimizedHighlighter>
            </Suspense>
            <span id="flashing-input"></span>
        </motion.div>
  );
}

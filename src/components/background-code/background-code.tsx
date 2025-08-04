import { useEffect, useState, Suspense, useRef, useMemo } from 'react';
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
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [fullCode, setFullCode] = useState<string>('');
  const animationRef = useRef<number | null>(null);
  const currentIndexRef = useRef<number>(0);

  const loadCodeFile = async (path: string) => {
    const response = await fetch(path);
    const text = await response.text();
    setFullCode(text);
    setDisplayedCode('');
    currentIndexRef.current = 0;
  };

  const codeTypingSpeed = useMemo(() => {
    switch (props.codeType) {
      case CodeType.Freeze:
        return 1500;
      case CodeType.Crunch:
        return 20;
      case CodeType.Reload:
        void loadCodeFile('/Equipment.cpp');
        props.onReloaded();
        return BaseTypingSpeed;
      default:
        return BaseTypingSpeed;
    }
  }, [props.codeType, props.onReloaded]);

  useEffect(() => {
    void loadCodeFile('/Equipment.cpp');
  }, []);

  useEffect(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (!fullCode || fullCode.length === 0 || props.codeType === CodeType.Reload) {
      return;
    }

    let lastTime = performance.now();
    let accumulated = 0;

    const animate = () => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;
      accumulated += delta;

      // Calculate how many characters should be shown
      const charsToShow = Math.floor(accumulated / codeTypingSpeed);
      
      if (charsToShow > currentIndexRef.current) {
        currentIndexRef.current = Math.min(charsToShow, fullCode.length);
        setDisplayedCode(fullCode.substring(0, currentIndexRef.current));
      }

      if (currentIndexRef.current < fullCode.length) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [fullCode, codeTypingSpeed, props.codeType]);

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
                    {displayedCode}
                </OptimizedHighlighter>
            </Suspense>
            <span id="flashing-input"></span>
        </motion.div>
  );
}
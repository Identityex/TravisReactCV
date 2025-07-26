import { lazy, Suspense, useState, useEffect } from 'react';

// Map of language names to their import paths
const LANGUAGE_LOADERS = {
  javascript: () => import('react-syntax-highlighter/dist/esm/languages/hljs/javascript'),
  typescript: () => import('react-syntax-highlighter/dist/esm/languages/hljs/typescript'),
  python: () => import('react-syntax-highlighter/dist/esm/languages/hljs/python'),
  java: () => import('react-syntax-highlighter/dist/esm/languages/hljs/java'),
  go: () => import('react-syntax-highlighter/dist/esm/languages/hljs/go'),
  rust: () => import('react-syntax-highlighter/dist/esm/languages/hljs/rust'),
  csharp: () => import('react-syntax-highlighter/dist/esm/languages/hljs/csharp'),
  cpp: () => import('react-syntax-highlighter/dist/esm/languages/hljs/cpp'),
  sql: () => import('react-syntax-highlighter/dist/esm/languages/hljs/sql'),
  dockerfile: () => import('react-syntax-highlighter/dist/esm/languages/hljs/dockerfile'),
};

// Only load the Light version of syntax highlighter (much smaller)
const SyntaxHighlighterLight = lazy(() => 
  import('react-syntax-highlighter/dist/esm/light')
);

interface OptimizedHighlighterProps {
  language: string;
  children: string;
  className?: string;
}

export function OptimizedHighlighter({ language, children, className }: OptimizedHighlighterProps) {
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    // Load theme
    import('react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-dark').then((mod) => {
      setTheme(mod.default);
    });

    // Load language
    const loader = LANGUAGE_LOADERS[language as keyof typeof LANGUAGE_LOADERS];
    if (loader) {
      Promise.all([
        import('react-syntax-highlighter/dist/esm/light'),
        loader(),
      ]).then(([highlighterMod, langMod]) => {
        const SyntaxHighlighter = highlighterMod.default;
        SyntaxHighlighter.registerLanguage(language, langMod.default);
        setIsLanguageLoaded(true);
      });
    }
  }, [language]);

  if (!isLanguageLoaded || !theme) {
    return (
      <pre className={className} style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '0.5rem' }}>
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <Suspense fallback={
      <pre className={className} style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '0.5rem' }}>
        <code>{children}</code>
      </pre>
    }>
      <SyntaxHighlighterLight language={language} style={theme} className={className}>
        {children}
      </SyntaxHighlighterLight>
    </Suspense>
  );
}
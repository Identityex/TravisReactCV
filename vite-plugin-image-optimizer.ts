import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export function imageOptimizer(): Plugin {
  return {
    name: 'vite-plugin-image-optimizer',
    enforce: 'pre',
    
    async transform(code, id) {
      // Process image imports in JS/TS files
      if (/\.(tsx?|jsx?)$/.test(id)) {
        // Add loading="lazy" to img tags that don't have loading attribute
        code = code.replace(
          /<img\s+(?![^>]*loading\s*=)([^>]*)(\/?)>/g,
          '<img loading="lazy" $1$2>'
        );
        
        // Add fetchpriority="high" to hero images (first image in components)
        let isFirstImage = true;
        code = code.replace(
          /<img\s+([^>]*)(\/?)>/g,
          (match, attrs, closing) => {
            if (isFirstImage && !attrs.includes('fetchpriority')) {
              isFirstImage = false;
              return `<img fetchpriority="high" ${attrs}${closing}>`;
            }
            return match;
          }
        );
      }
      
      return code;
    },
    
    // Add image optimization hints to HTML
    transformIndexHtml(html) {
      // Add responsive images meta tag
      html = html.replace(
        '</head>',
        '  <meta name="format-detection" content="telephone=no">\n  </head>'
      );
      
      return html;
    }
  };
}
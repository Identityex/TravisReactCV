import styles from './section.module.scss';
import { ReactNode } from 'react';

export interface SectionProps {
  sectionId: string
  useParralax?: boolean
  backgroundImg?: string
  children?: ReactNode
  className?: string
}

export function Section(props: SectionProps) {
  return (
        <section 
            className={
                'w-full flex flex-col items-center '
                + (props.useParralax ? ' bg-fixed ' : '')
                + (props.backgroundImg ? ' bg-cover bg-center ' : '')
                + styles.section
                + (props.className ? ' ' + props.className : '')
            } 
            style={{
              backgroundImage: props.backgroundImg ? `url(${props.backgroundImg})` : undefined,
            }}
            id={props.sectionId}
            aria-labelledby={`${props.sectionId}-heading`}
        >
            {props.children}
        </section>
  );
}

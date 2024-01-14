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
        <div className={
            'w-full h-screen flex flex-col justify-center items-center '
            + (props.useParralax ? ' bg-fixed ' : '')
            + (props.backgroundImg ? ' bg-cover bg-center ' : '')
            + styles.section
            + (props.className ? ' ' + props.className : '')
        } style={{
          backgroundImage: props.backgroundImg ? `url(${props.backgroundImg})` : undefined,
        }}
             id={props.sectionId}
        >
            {props.children}
        </div>
  );
}

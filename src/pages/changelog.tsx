import styles from './changelog.module.scss';
import changelog from '../../CHANGELOG.json';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

interface ChangeLog {
  changes: ChangelogItem[]
}

interface ChangelogItem {
  date: string;
  changes: string[]
}

export function Changelog() {
  const changelogData: ChangelogItem[] = (changelog as ChangeLog).changes;
    
  console.log(changelogData);
  
  return (
      <>
          <SpeedInsights/>
          <Analytics/>
          <div className={styles.changelog}>
              <h1>Changelog</h1>
              <p className={styles.changelogDescription}>This is a list of the changes that have been made to the site.</p>
              <ul>
                  {changelogData.map((item) => (
                      <li key={item.date}>
                          <h3>{item.date}</h3>
                          <ul>
                              {item.changes.map((change) => (
                                  <li key={change}>{change}</li>
                              ))}
                          </ul>
                      </li>
                  ))}
              </ul>
          </div>
      </>
  );
}

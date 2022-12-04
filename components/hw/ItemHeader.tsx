import { type HWItem } from "../../pages/hw";
import Link from 'next/link'
import styles from './ItemHeader.module.css'
import Image from 'next/image'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function ItemHeader({ item, rank }: { item: HWItem, rank?: number }) {

  return (
    <div className={styles["container-item"]} key={item.id}>
      {
        rank !== undefined && <div className={styles['rank']}>{rank! + 1}.{" "}</div>
      }
      <Link
        href={
          ("url" in item && item.url) ? item.url : `/hw/item/${item.id}`
        }
        className={styles['title']}>
        {item.title}
      </Link>
      {
        ("url" in item && item.url) &&
        <a className={styles["link"]} href={item.url}>
          {`(${item.url.replace(/^https?:\/\//, '').split('/')[0]})`}
        </a>
      }
      <div className={styles["y-link"]}>
        <a target="_blank" href={`https://news.ycombinator.com/item?id=${item.id}`} >
          <Image src="/y18.gif" alt="" width="18" height="18" />
        </a>
      </div>
      <div className={styles['metadata-table']}>
        {('score' in item && item.score) && <div className={styles["points"]}>{item.score} {item.score > 1 ? "points" : "point"}</div>}
        <div className={styles["by"]}>posted by{" "}
          <Link prefetch={false} href={`/hw/user/${item.by}`}>{item.by}</Link>
        </div>
        {("time" in item && item.time) && <div className={styles["time"]}>{timeAgo.format(new Date(item.time * 1000), 'round')}</div>}
        {("kids" in item && item.kids) &&
          <div className={styles["comments"]}>
            <span>
              <span> {item.kids.length} </span>
              <Link href={`/hw/item/${item.id}`}>{item.kids.length > 1 ? 'comments' : 'comment'}</Link>
            </span>
          </div>
        }
      </div>
    </div >
  );
}
import { GetStaticProps } from 'next'
import styles from '../styles/hw.module.css'
import Layout from '../components/ParticlesLayout'
import ItemHeader from '../components/hw/ItemHeader'
import useSWR from 'swr';
import { useInView } from 'react-intersection-observer';

function Story({ id, item, rank }: { id: string | number, item: HWItem | null, rank: number }) {
  const { ref, inView } = useInView({ threshold: 1, triggerOnce: true });

  const { data: hwItem } = useSWR<HWItem | null>((id && inView) ? ['/item', id] : null, async (api, id) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0${api}/${id}.json`)
    return await res.json() as HWItem
  }, { fallbackData: item, revalidateOnMount: true })

  return (
    <div ref={ref} className={styles["story-container"]}>
      {hwItem && (
        <div className={styles['item']}>
          <span className={styles["rank"]}>{rank + 1}</span>
          <ItemHeader item={hwItem} />
        </div>
      )
      }
      {!hwItem && inView && <div>Loading ... </div>}
    </div>
  )
}

export default function HakerNews(props: { topStories?: number[], hwItems: [number, null | HWItem][] }) {

  return (
    <Layout title='Hacker News'>
      <div className={styles['container']}>
        {
          props.hwItems.map(([id, data], rank) => {
            return (
              <div>
                <Story key={id} id={id} item={data} rank={rank} />
              </div>
            )
          })
        }
      </div>
    </Layout >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
  const topStoriesHW = await res.json() as number[]

  const topStoriesHWPromises = topStoriesHW.map(async (id, index) => {
    if (index >= 100) return [id, null] // limit to 100 items to cache
    try {
      const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      const item = await res.json() as HWItem
      return [id, item] as const
    } catch (error) {
      return [id, null] as const
    }
  })

  const hwItems = await Promise.all(topStoriesHWPromises)

  return {
    props: {
      topStoriesHW,
      hwItems,
    },
    revalidate: 60, // In seconds
  }
}


export type HWItem = HWStory | HWJob

interface HWBase {
  id: number;
  deleted?: boolean// true if the item is deleted.  optional
  type: "job" | "story" | "comment" | "poll" | "pollopt"
  by?: string // The username of the item's author.
  time?: number // Creation date of the item, in Unix Time.
  dead?: boolean// true if the item is dead.
  kids?: number[]// The ids of the item's comments, in ranked display order.
}

export interface HWStory extends HWBase {
  type: "story"
  descendants?: number// In the case of stories or polls, the total comment count.  optional
  score?: number // The story's score, or the votes for a pollopt.  optional
  title?: string //The title of the story, poll or job.  optional
  url?: string //The URL of the story.  default: http://stoplight.io/prism/ optional
}

export interface HWComment extends HWBase {
  type: "comment"
  parent?: number// The item's parent. For comments, either another comment or the relevant story. For pollopts, the relevant poll.  optional
  text?: string //The comment, story or poll text. HTML.  optional
}

export interface HWJob extends HWBase {
  type: "job"
  text?: string //The comment, story or poll text. HTML.  optional
  url?: string //The URL of the story.  optional
  title?: string //The title of the story, poll or job.  optional
}

export interface HWPool extends HWBase {
  "descendants": number
  "parts": number[]
  "score": number
  "text": string
  "title": string
  "type": "poll"
}

export interface HWPoolOption extends HWBase {
  "poll": number
  "score": number
  "text": string
  "type": "pollopt"
}
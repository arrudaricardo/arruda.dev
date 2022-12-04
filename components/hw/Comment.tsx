import useSWR from 'swr'
import { HWComment } from '../../pages/hw'
import { useState } from 'react'
import Link from 'next/link'
import { useMemo } from 'react'
import { sanitize } from 'isomorphic-dompurify';



import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default function Comments({ id, parentLevel }: { id: number, parentLevel?: number }) {
  const [level] = useState(parentLevel === undefined ? 0 : parentLevel)
  const { data } = useSWR<HWComment>([`/item`, id], async (api, id) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0${api}/${id}.json`)
    return await res.json() as HWComment
  })
  const color = useMemo(() => [Math.random() * 256 >> 0, Math.random() * 256 >> 0, Math.random() * 256 >> 0], [level] as const)

  return (
    <div className='container'>
      <style jsx>{`
          .container {
            border-left: 1px solid rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);
            position: relative;
            padding-left: 10px;
            margin-left: ${level * 1.8}rem;
            margin-bottom: 2rem;
          }
          .info {
            font-size: 0.8rem;
            display: flex;
          }

          .comment-text {
            ${(data?.deleted || data?.dead) ? "text-decoration: line-through;" : ''}
            background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2);
          }
        `}</style>
      {data ? (
        <>
          <div className='info'>
            <span className=''>
              <span> by: <Link href={`hw/user/${data.by}`} legacyBehavior><a>{data.by}</a></Link></span>
              {data.time && <span> - {timeAgo.format(new Date(data.time * 1000), 'round')}</span>}
            </span>
          </div>
          {data.text && <div className='comment-text' dangerouslySetInnerHTML={{ __html: sanitize(data.text) }}></div>}
          {data.kids?.map(id => <Comments id={id} parentLevel={level + 1} />)}
        </>
      ) : <div>Loading</div>
      }
    </div>
  );


}

import { GetStaticPaths, GetStaticProps } from 'next'
import { type HWItem } from '../../hw'
import Item from '../../../components/hw/Item'
import useSWR from 'swr'

export default function HwItem({ item, id }: { item: HWItem | undefined; id: string | number }) {

  const { data: itemData } = useSWR(['/item', id], async (api, id) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0${api}/${id}.json`)
    return await res.json() as HWItem
  }, { fallbackData: item, revalidateOnMount: true })


  return (
    <div>
      {(itemData) ? <Item item={itemData!} />
        : <div>Loading...</div>}
    </div>)
}


export const getStaticProps: GetStaticProps = async (props) => {
  const id = props.params?.id
  try {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    const item = await res.json() as HWItem
    return {
      props: {
        id,
        item,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      props: {
        id,
        item: null
      },
      revalidate: 60,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
}
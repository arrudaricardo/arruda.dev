import { GetStaticPaths, GetStaticProps } from 'next'
import User from '../../../components/hw/User'
import Layout from '../../../components/Layout'

export default function UserPage({ id }: { id: string }) {
  return (
    <Layout title={id}>
      {id ? <User id={id} /> : <div>Loading...</div>}
    </Layout>)
}


export const getStaticProps: GetStaticProps = async (props) => {
  const id = props.params?.id
  return {
    props: {
      id,
    },
    revalidate: 60
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
}
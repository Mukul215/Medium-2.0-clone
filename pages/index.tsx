import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

// created an interface for type safety
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}
    </div>
  )
}

// Added server side rendeing for homepage to show posts when loading
export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
  _id,
  title,
  slug,
  mainImage,
  author -> {
    name,
    image
  }
}`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

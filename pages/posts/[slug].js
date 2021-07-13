import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts,getPostBySlug,getAuthorBySlug  } from '../../lib/api'

export default function Post({createdAt,author,body,title}) {
    const prettyDate = new Date(createdAt).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
  
  return (
    <div className="post">
      hey
       <h1>{title}</h1>

      <time dateTime={createdAt}>{prettyDate}</time>
      <div>
        <Image alt={author.name} src={author.profilePictureUrl} height="150" width="150"/>
        <Link href={author.permalink}>
          <a>
            {author.name}
          </a>
        </Link>
      </div>

      <div dangerouslySetInnerHTML={{__html:body}}/>
    </div>
  )
}

export function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  return {
    props: {
      ...post,
      author:getAuthorBySlug(post.author)
    }
  }
}

export function getStaticPaths(){
  return {
    fallback: false,
    paths: getAllPosts().map(post => ({
      params: {
        slug: post.slug,
      },
    })),
  }
}

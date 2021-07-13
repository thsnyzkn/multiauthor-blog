import Image from 'next/image'
import Link from 'next/link'

import { getAllAuthors, getAllPosts } from '../../lib/api'

export default function Authors({ authors }) {
    
  return (
    <div className="authors">
      <h1>Authors</h1>

      {authors.map(author => (
        <div key={author.slug}>
          <h2>
            <Link href={author.permalink}>
              <a>{author.name}</a>
            </Link>
          </h2>

          <Image alt={author.name} src={author.profilePictureUrl} height="150" width="150" />

          <Link href={author.permalink}>
            <a>Go to profile →</a>
          </Link>
          <p>{author.posts.length} post(s)</p>
        </div>
      ))}
    </div>
  )
}

export function getStaticProps() {
  return {
    props: {
      authors: getAllAuthors().map(author=>({
        ...author,
        posts:getAllPosts().filter(post => post.author === author.slug)
      })),
    },
  }
}

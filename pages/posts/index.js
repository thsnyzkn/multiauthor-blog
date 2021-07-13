import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAuthorBySlug } from '../../lib/api'
export function getStaticProps() {
    return {
        props: {
            posts:getAllPosts().map(post=> ({
                ...post,
                author:getAuthorBySlug(post.author)
            }))
        }
    }
}

function Posts({ posts }) {
    return (<div className="posts">
        <h1>Posts</h1>
        {posts.map(post => {
            const prettyDate = new Date(post.createdAt).toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            })
            return (
                <article key={post.slug}>
                    <h2>
                        <Link href={post.permalink}>
                            <a>{post.title}</a>
                        </Link>
                    </h2>
                    <time dateTime={post.createdAt}>{prettyDate}</time>
                    <div>
                        <Image alt={post.author.name} src={post.author.profilePictureUrl} height="40" width="40"/>
                        <span>{post.author.name}</span>
                    </div>
                    <p>{post.excerpt}</p>
                    <Link href={post.permalink}>
                        <a>Read more ±</a>
                    </Link>
                </article>
            )
        })

        }
    </div>)
}

export default Posts;
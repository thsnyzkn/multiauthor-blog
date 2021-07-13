import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark'
import html from 'remark-html'

export function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), '_posts')
    const filenames = fs.readdirSync(postsDirectory)


    return filenames.map(filename => {
        const file = fs.readFileSync(path.join(process.cwd(), '_posts', filename), 'utf8')
        const { data } = matter(file)
        const slug = filename.replace(/\.md$/, '')

        return {
            ...data,
            slug,
            permalink: `/posts/${slug}`
        }
    })
}

export function getPostBySlug(slug) {
    const file = fs.readFileSync(path.join(process.cwd(), '_posts', `${slug}.md`), 'utf8')

    const {
        content,
        data,
    } = matter(file)
    const body = remark().use(html).processSync(content).toString()

    return {
        ...data,
        body,
    }
}

export function getAllAuthors() {
    const authorsDirectory = path.join(process.cwd(), '_authors')
    const filenames = fs.readdirSync(authorsDirectory)

    return filenames.map(filename => {
        const file = fs.readFileSync(path.join(process.cwd(), '_authors', filename), 'utf8')

        const data = JSON.parse(file)

        const slug = filename.replace(/\.json/, '')
        return {
            ...data,
            slug,
            permalink: `/authors/${slug}`,
            profilePictureUrl: `/${slug}.jpg`
        }
    })
}

export function getAuthorBySlug(slug) {
    const file = fs.readFileSync(path.join(process.cwd(), '_authors', `${slug}.json`), 'utf8')

    const data = JSON.parse(file)

    return {
        ...data,
        permalink: `/authors/${slug}`,
        profilePictureUrl: `/${slug}.jpg`,
        slug,
    }
}
import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'filler-words' })

export default function Page() {
  return <ArticlePage slug="filler-words" />
}

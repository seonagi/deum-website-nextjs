import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'creator-mistakes' })

export default function Page() {
  return <ArticlePage slug="creator-mistakes" />
}

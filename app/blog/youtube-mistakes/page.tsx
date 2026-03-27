import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'youtube-mistakes' })

export default function Page() {
  return <ArticlePage slug="youtube-mistakes" />
}

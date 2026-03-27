import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'watch-time-psychology' })

export default function Page() {
  return <ArticlePage slug="watch-time-psychology" />
}

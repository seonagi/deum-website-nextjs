import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'platform-optimization' })

export default function Page() {
  return <ArticlePage slug="platform-optimization" />
}

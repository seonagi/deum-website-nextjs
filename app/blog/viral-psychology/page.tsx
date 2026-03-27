import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'viral-psychology' })

export default function Page() {
  return <ArticlePage slug="viral-psychology" />
}

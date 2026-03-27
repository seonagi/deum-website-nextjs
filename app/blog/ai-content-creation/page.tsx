import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'ai-content-creation' })

export default function Page() {
  return <ArticlePage slug="ai-content-creation" />
}

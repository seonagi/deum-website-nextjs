import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'viewer-expectations' })

export default function Page() {
  return <ArticlePage slug="viewer-expectations" />
}

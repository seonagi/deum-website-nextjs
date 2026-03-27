import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'professional-videos' })

export default function Page() {
  return <ArticlePage slug="professional-videos" />
}

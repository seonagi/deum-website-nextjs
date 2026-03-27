import { ArticlePage, generateMetadata as baseGenerateMetadata } from '../article-layout'

export const metadata = baseGenerateMetadata({ slug: 'editing-efficiency' })

export default function Page() {
  return <ArticlePage slug="editing-efficiency" />
}

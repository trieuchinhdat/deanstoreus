import { cookies } from 'next/headers'
import { DEFAULT_LANG, langCookieName } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { IMAGE_QUERY } from '@/sanity/lib/queries'
import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import FilterList from '@/ui/modules/blog/BlogList/FilterList'
import { Suspense } from 'react'
import ProductPreview from '../ProductPreview'
import List from './List'
import { cn } from '@/lib/utils'

export default async function ProductList({
	pretitle,
	intro,
	layout,
	limit,
	displayFilters,
	filteredCategory,
	backgroundColor,
	...props
}: Partial<{
	pretitle: string
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	displayFilters: boolean
	filteredCategory: Sanity.ProductCategory
	backgroundColor: string
}> &
	Sanity.Module) {
	const lang = (await cookies()).get(langCookieName)?.value ?? DEFAULT_LANG

	const productlist = await fetchSanityLive<Sanity.ProductDetail[]>({
		query: groq`
			*[
				_type == 'product.detail'
				${!!lang ? `&& (!defined(language) || language == '${lang}')` : ''}
				${!!filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]|order(
				publishDate desc
			)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->,
				metadata{
					...,
					image { ${IMAGE_QUERY} }
				}
			}
		`,
		params: {
			filteredCategory: filteredCategory?._id || '',
			limit: limit ?? 0,
		},
	})

	const listClassName = cn(
		'items-stretch gap-8 max-md:gap-4',
		stegaClean(layout) === 'grid'
			? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
			: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
	)

	return (
		<section
			{...moduleProps(props)}
			style={{ backgroundColor: backgroundColor || '#ffffff' }}
		>
			<div className="section space-y-8">
				{intro && (
					<header className="richtext text-center">
						<Pretitle>{pretitle}</Pretitle>
						<PortableText value={intro} />
					</header>
				)}

				{displayFilters && !filteredCategory && <FilterList />}

				<Suspense
					fallback={
						<ul className={listClassName}>
							{Array.from({ length: limit ?? 6 }).map((_, i) => (
								<li key={i}>
									<ProductPreview skeleton />
								</li>
							))}
						</ul>
					}
				>
					<List productlist={productlist} className={listClassName} />
				</Suspense>
			</div>
		</section>
	)
}

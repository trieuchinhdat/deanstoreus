import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { PRODUCT_DIR } from '@/lib/env'
import resolveUrl from '@/lib/resolveUrl'
import { Feed } from 'feed'
import { escapeHTML, toHTML } from '@portabletext/to-html'
import { urlFor } from '@/sanity/lib/image'
import { DEFAULT_LANG } from '@/lib/i18n'

export async function GET() {
	const { product, listproduct, copyright } = await fetchSanityLive<{
		product: Sanity.Page
		listproduct: Array<Sanity.ProductDetail & { image?: string }>
		copyright: string
	}>({
		query: groq`{
			'product': *[_type == 'page' && metadata.slug.current == '${PRODUCT_DIR}'][0]{
				_type,
				title,
				metadata,
				'image': metadata.image.asset->url,
			},
			'listproduct': *[_type == 'product.detail']{
				_type,
				body,
				metadata,
				'image': metadata.image.asset->url,
				language,
			},
			'copyright': pt::text(*[_type == 'site'][0].copyright)
		}`,
	})

	if (!product || !listproduct) {
		return new Response(
			'Missing either a product page or product in Sanity Studio',
			{ status: 500 },
		)
	}

	const url = resolveUrl(product)

	const feed = new Feed({
		title: product?.title || product.metadata.title,
		description: product.metadata.description,
		link: url,
		id: url,
		copyright,
		favicon: process.env.NEXT_PUBLIC_BASE_URL + '/favicon.ico',
		language: DEFAULT_LANG,
		generator: 'https://sanitypress.dev',
	})

	listproduct.map((product) => {
		const url = resolveUrl(product, { language: product.language })

		return feed.addItem({
			title: escapeHTML(product.metadata.title),
			description: product.metadata.description,
			id: url,
			link: url,
			published: new Date(product.publishDate),
			date: new Date(product.publishDate),
			content: toHTML(product.body, {
				components: {
					types: {
						image: ({ value: { alt = '', caption, source, ...value } }) => {
							const img = `<img src="${urlFor(value).url()}" alt="${escapeHTML(alt)}" />`
							const figcaption =
								caption && `<figcaption>${escapeHTML(caption)}</figcaption>`
							const aSource = source && `<a href="${source}">(Source)</a>`
							return `<figure>${[img, figcaption, aSource].filter(Boolean).join(' ')}</figure>`
						},
						admonition: ({ value: { title, content } }) =>
							`<dl><dt>${title}</dt><dd>${escapeHTML(content)}</dd></dl>`,
						code: ({ value }) =>
							`<pre><code>${escapeHTML(value.code)}</code></pre>`,
					},
				},
			}),
			image: product.image,
		})
	})

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml',
		},
	})
}

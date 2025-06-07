import { BLOG_DIR, PRODUCT_DIR } from './env'
import { DEFAULT_LANG } from './i18n'
import { stegaClean } from 'next-sanity'

export default function resolveUrl(
	page?: Sanity.PageBase,
	{
		base = true,
		params,
		language,
	}: {
		base?: boolean
		params?: string
		language?: string
	} = {},
) {
	if (!page) return ''

	const type = page._type
	const slug = page?.metadata?.slug?.current
	const langPrefix = language && language !== DEFAULT_LANG ? `/${language}` : ''
	const pathSlug = slug === 'index' ? '' : `/${slug}`

	let prefix = ''

	if (type === 'blog.post') {
		prefix = `/${BLOG_DIR}`
	} else if (type === 'product.detail') {
		prefix = `/${PRODUCT_DIR}`
	}

	return [
		base ? process.env.NEXT_PUBLIC_BASE_URL : '',
		langPrefix,
		prefix,
		pathSlug,
		stegaClean(params),
	]
		.filter(Boolean)
		.join('')
}

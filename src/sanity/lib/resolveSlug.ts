import { BLOG_DIR } from '@/lib/env'
import { PRODUCT_DIR } from '@/lib/env'

export default function resolveSlug({
	_type,
	internal,
	params,
	external,
}: {
	// internal
	_type?: string
	internal?: string
	params?: string
	// external
	external?: string
}) {
	if (external) return external

	if (internal) {
		const segment = _type === 'blog.post' ? `/${BLOG_DIR}/` : '/'
		const isProduct = _type === 'product.detail' ? `/${PRODUCT_DIR}/` : '/'
		const path = internal === 'index' ? null : internal

		return [segment, isProduct, path, params].filter(Boolean).join('')
	}

	return undefined
}

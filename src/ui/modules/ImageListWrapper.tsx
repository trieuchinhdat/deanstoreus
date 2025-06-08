import moduleProps from '@/lib/moduleProps'
import ImageList from './ImageList'
import { cn } from '@/lib/utils'

export default function ImageListWrapper({
	assets,
	layout,
	columns,
	autoplay,
	fullscreen,
	bordered = true,
	lightbox,
	tiers,
}: {
	assets?: Sanity.Img[]
	layout?: 'grid' | 'carousel'
	columns?: any
	autoplay?: boolean
	fullscreen?: boolean
	bordered?: boolean
	lightbox?: boolean
	tiers?: Sanity.Pricing
}) {
	const isAutoplayEnabled = autoplay ?? false
	const isLightboxEnabled = lightbox ?? false
	if (!assets?.length) return null
	return (
		<ImageList
			assets={assets}
			layout={layout}
			columns={columns}
			autoplay={isAutoplayEnabled}
			fullscreen={fullscreen}
			bordered={bordered}
			lightbox={isLightboxEnabled}
			tiers={tiers}
		/>
	)
}

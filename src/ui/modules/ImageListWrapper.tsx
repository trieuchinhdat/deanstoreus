import moduleProps from '@/lib/moduleProps'
import ImageList from './ImageList'
import { cn } from '@/lib/utils'

export default function ImageListWrapper({
	assets,
	layout,
	columnsdesktop,
	columnsmobile,
	autoplay,
	lightbox,
	tiers,
}: {
	assets?: Sanity.Img[]
	layout?: 'grid' | 'carousel'
	columnsdesktop?: number
	columnsmobile?: number
	autoplay?: boolean
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
			columnsdesktop={columnsdesktop}
			columnsmobile={columnsmobile}
			autoplay={isAutoplayEnabled}
			lightbox={isLightboxEnabled}
			tiers={tiers}
		/>
	)
}

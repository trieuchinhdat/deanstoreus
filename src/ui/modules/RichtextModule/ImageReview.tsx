'use client'

import { useState } from 'react'
import { Img } from '@/ui/Img'
import { stegaClean } from 'next-sanity'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

export default function ImageReview({
	value,
}: {
	value: Sanity.Image &
		Partial<{
			caption: string
			source: string
			float: 'left' | 'right'
		}>
}) {
	const [open, setOpen] = useState(false)
	const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(false)
	return (
		<>
			<figure
				className="mt-2 mr-2 inline-block max-w-[100px] cursor-zoom-in space-y-2 text-center"
				style={{ float: stegaClean(value.float) }}
				onClick={() => setOpen(true)}
			>
				<Img
					className="bg-accent/3 max-h-svh w-auto overflow-hidden rounded-xl text-[0px] max-md:rounded-none"
					image={value}
					width={1500}
				/>

				{value.caption && (
					<figcaption className="text-ink/50 px-4 text-sm text-balance italic">
						{value.caption}

						{value.source && (
							<>
								{' ('}
								<a href={value.source} className="image-source link">
									Source
								</a>
								{')'}
							</>
						)}
					</figcaption>
				)}
			</figure>

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={[{ src: value.imageUrl ?? '' }]}
				plugins={[Zoom]}
				carousel={{ finite: true }}
				zoom={{ maxZoomPixelRatio: 2, zoomInMultiplier: 1.5 }}
				controller={{ closeOnBackdropClick: true }}
			/>
		</>
	)
}

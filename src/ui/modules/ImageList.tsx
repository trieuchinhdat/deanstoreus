'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'
import { ResponsiveImg } from '@/ui/Img'
import { cn, formatCurrency } from '@/lib/utils'
import styles from './ImageList.module.css'
import { Autoplay, Navigation } from 'swiper/modules'
import Link from 'next/link'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { generateSrc } from '../Img'
import { PortableText } from 'next-sanity'
import CTAList from '../CTAList'
import CustomHTML from './CustomHTML'
import Admonition from './RichtextModule/Admonition'

export default function ImageList({
	assets,
	layout = 'grid',
	columns,
	autoplay,
	fullscreen = false,
	bordered = true,
	lightbox,
	tiers,
}: {
	assets: Sanity.Img[]
	layout?: 'grid' | 'carousel' | 'product'
	columns?: any
	autoplay?: boolean
	fullscreen?: boolean
	bordered?: boolean
	lightbox?: boolean
	tiers?: Sanity.Pricing
}) {
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

	const [open, setOpen] = useState(false)
	const [index, setIndex] = useState(0)
	const slides = assets
		.filter((block) => block?.image?.asset)
		.map((block) => {
			const { src } = generateSrc(block.image)
			return {
				src,
				alt: block.alt || '',
			}
		})
	const [closeOnBackdropClick, setCloseOnBackdropClick] = useState(false)

	const gridColsMap: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
	}
	if (!assets?.length) return null
	return (
		<section
			className={cn(
				fullscreen
					? 'grid overflow-hidden *:col-span-full *:row-span-full'
					: 'section section-image-list space-y-8',
			)}
		>
			{/* Grid layout */}
			{layout === 'grid' && (
				<div
					className={[
						'layout-grid grid gap-2',
						gridColsMap[columns?.mobile || 1],
						`md:${gridColsMap[columns?.desktop || 2]}`,
						`lg:${gridColsMap[columns?.desktop || 2]}`,
					].join(' ')}
				>
					{assets.map((block, blockIdx) => {
						const image = (
							<ResponsiveImg
								img={block}
								className="max-h-fold size-full object-cover"
								width={2400}
								draggable={false}
							/>
						)

						const handleClick = () => {
							if (lightbox) {
								setIndex(blockIdx)
								setOpen(true)
							}
						}

						const wrapperClass = [
							'overflow-hidden shadow',
							lightbox ? 'cursor-pointer' : '',
							bordered ? 'rounded-xl' : '',
						].join(' ')

						return (
							<div
								key={blockIdx}
								className={wrapperClass}
								onClick={handleClick}
							>
								{lightbox || !block?.url ? (
									image
								) : (
									<Link href={block.url}>{image}</Link>
								)}
							</div>
						)
					})}

					{lightbox && (
						<Lightbox
							open={open}
							close={() => setOpen(false)}
							slides={slides}
							index={index}
							on={{ view: ({ index }) => setIndex(index) }}
							plugins={[Zoom]}
							carousel={{ finite: true }}
							zoom={{ maxZoomPixelRatio: 2, zoomInMultiplier: 1.5 }}
							controller={{ closeOnBackdropClick: true }}
						/>
					)}
				</div>
			)}

			{/* Carousel layout */}
			{layout === 'carousel' && (
				<div className="layout-carousel w-full">
					<Swiper
						modules={[Autoplay, Navigation]}
						slidesPerView="auto"
						spaceBetween={20}
						navigation={true}
						{...(autoplay && {
							autoplay: {
								delay: 5000,
								disableOnInteraction: true,
							},
						})}
						speed={1000}
						breakpoints={{
							0: { slidesPerView: columns?.mobile || 1, spaceBetween: 10 },
							768: { slidesPerView: columns?.mobile || 1 },
							1024: { slidesPerView: columns?.desktop || 2 },
						}}
					>
						{assets.map((block, blockIdx) => (
							<SwiperSlide key={blockIdx}>
								<div
									className={cn(
										'cursor-pointer overflow-hidden shadow',
										bordered && 'rounded-xl',
									)}
									onClick={() => {
										if (lightbox) {
											setIndex(blockIdx)
											setOpen(true)
										}
									}}
								>
									{lightbox || !block?.url ? (
										<ResponsiveImg
											img={block}
											className="max-h-fold size-full object-cover"
											width={2400}
											draggable={false}
										/>
									) : (
										<Link href={block.url}>
											<ResponsiveImg
												img={block}
												className="max-h-fold size-full object-cover"
												width={2400}
												draggable={false}
											/>
										</Link>
									)}
								</div>
							</SwiperSlide>
						))}
						{lightbox && (
							<Lightbox
								open={open}
								close={() => setOpen(false)}
								slides={slides}
								index={index}
								on={{ view: ({ index }) => setIndex(index) }}
								plugins={[Zoom]}
								carousel={{ finite: true }}
								zoom={{ maxZoomPixelRatio: 2, zoomInMultiplier: 1.5 }}
								controller={{ closeOnBackdropClick: true }}
							/>
						)}
					</Swiper>
				</div>
			)}

			{/* Product gallery layout */}
			{layout === 'product' && (
				<div
					className={cn(
						'layout-product grid items-start gap-6',
						tiers ? 'grid grid-cols-1 gap-6 lg:grid-cols-10' : 'grid-cols-1',
					)}
				>
					{/* LEFT: Image Slideshow */}
					<div className="lg:col-span-4">
						<Swiper
							modules={[Thumbs]}
							thumbs={{ swiper: thumbsSwiper }}
							className="w-full"
						>
							{assets.map((block, i) => (
								<SwiperSlide key={`main-${i}`}>
									<div
										className={cn(
											'aspect-w-16 aspect-h-9 overflow-hidden shadow',
											bordered && 'rounded-xl',
										)}
										onClick={() => {
											if (lightbox) {
												setIndex(i)
												setOpen(true)
											}
										}}
									>
										<ResponsiveImg
											img={block}
											className="h-full w-full object-cover"
											width={2400}
											draggable={false}
										/>
									</div>
								</SwiperSlide>
							))}
							{lightbox && (
								<Lightbox
									open={open}
									close={() => setOpen(false)}
									slides={slides}
									index={index}
									on={{ view: ({ index }) => setIndex(index) }}
									plugins={[Zoom]}
									carousel={{ finite: true }}
									zoom={{ maxZoomPixelRatio: 2, zoomInMultiplier: 1.5 }}
									controller={{ closeOnBackdropClick: true }}
								/>
							)}
						</Swiper>

						<Swiper
							onSwiper={setThumbsSwiper}
							modules={[Thumbs]}
							spaceBetween={10}
							slidesPerView={4}
							watchSlidesProgress
							className="mt-2"
						>
							{assets.map((block, i) => (
								<SwiperSlide key={`thumb-${i}`}>
									<div
										className={cn(
											styles.thumbSlide,
											'aspect-w-16 aspect-h-9 overflow-hidden shadow',
											bordered && 'rounded-xl',
										)}
									>
										<ResponsiveImg
											img={block}
											className="h-full w-full object-cover"
											width={800}
											draggable={false}
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* RIGHT: Product Info */}
					{tiers && (
						<div className="space-y-4 lg:col-span-6">
							{tiers && (
								<span className="text-sm font-bold text-[#999] uppercase">
									{tiers.highlight}
								</span>
							)}
							{tiers && (
								<h1 className="text-2xl font-bold max-md:text-xl">
									{tiers.title}
								</h1>
							)}

							{tiers && tiers.price?.base !== undefined && (
								<div className="flex flex-wrap items-end gap-x-2">
									{tiers.price.base !== undefined &&
										!isNaN(tiers.price.base) && (
											<b className="text-3xl font-extrabold text-green-600 max-md:text-2xl">
												{formatPrice(tiers.price.base)}
											</b>
										)}
									{tiers.price.strikethrough && (
										<>
											<s className="text-lg font-medium text-[#999] line-through decoration-[#999] max-md:text-sm">
												{formatPrice(tiers.price.strikethrough)}
											</s>
											<span className="rounded bg-amber-100 px-2 text-xl font-extrabold text-green-600 max-md:text-sm">
												{Math.round(
													((tiers.price.strikethrough - tiers.price.base) /
														tiers.price.strikethrough) *
														100,
												)}
												%
											</span>
										</>
									)}
									{/* Suffix như /mo, /year */}
									{tiers.price.suffix && (
										<span className="text-xl font-semibold text-gray-700">
											{tiers.price.suffix}
										</span>
									)}
								</div>
							)}
							{tiers && (
								<div className="richtext">
									{tiers.content && (
										<PortableText
											value={tiers.content}
											components={{
												types: {
													'custom-html': ({ value }) => (
														<CustomHTML {...value} />
													),
													admonition: Admonition,
												},
											}}
										/>
									)}
								</div>
							)}
							{tiers && <CTAList ctas={tiers.ctas} className="!mt-6" />}
						</div>
					)}
				</div>
			)}
		</section>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return formatCurrency(value).replace(/\.00$/, '')
}

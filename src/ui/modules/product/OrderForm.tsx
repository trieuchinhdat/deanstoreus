import { getSite } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import FormBuyNow from './FormBuyNow'
import FormContact from './FormContact'
import Image from '../RichtextModule/Image'
import CustomHTML from '../CustomHTML'
import DailyCountdown from './DailyCountdown'
import { cn } from '@/lib/utils'

type Option = { title: string }
type OrderFormProps = {
	content?: any
	saleSettings?: any
	option1?: Option[]
	option2?: Option[]
	title?: string
	layout?: 'form order' | 'form contact'
	assetOnLeft?: boolean
	widthStyle?: string
	backgroundImage?: string
	backgroundColor?: string
}
export default async function OrderForm({
	content,
	saleSettings,
	option1 = [],
	option2 = [],
	title,
	layout,
	assetOnLeft = false,
	widthStyle,
	backgroundImage,
	backgroundColor,
}: OrderFormProps) {
	const { ordersite } = await getSite()

	return (
		<section
			id={layout === 'form contact' ? 'id-form-contact' : 'id-form-order'}
			className="section section-form-container space-y-8"
			{...(backgroundImage && {
				style: {
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				},
			})}
		>
			{layout === 'form order' && (
				<div
					className={cn(
						'section section-form mx-auto grid gap-8 rounded-xl',
						assetOnLeft && 'md:grid-cols-2',
					)}
					style={{
						maxWidth: widthStyle,
						backgroundColor: backgroundColor,
					}}
				>
					<header className="mx-auto w-full max-w-screen-lg text-center">
						<PortableText
							value={content}
							components={{
								types: {
									// Media
									image: Image,
									'custom-html': ({ value }) => (
										<CustomHTML
											className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto"
											{...value}
										/>
									),
								},
							}}
						/>
						{saleSettings?.showCountdown && (
							<DailyCountdown lastSaleDate={saleSettings.lastSaleDate} />
						)}
					</header>
					<FormBuyNow
						title={title}
						option1={option1}
						option2={option2}
						product={title}
						ordersite={ordersite}
					/>
				</div>
			)}
			{layout === 'form contact' && (
				<div
					className="section section-form mx-auto grid gap-8 rounded-xl"
					style={{
						maxWidth: widthStyle,
						backgroundColor: backgroundColor,
					}}
				>
					<header className="mx-auto w-full max-w-screen-lg text-center">
						<PortableText value={content} />
					</header>
					<div className="mx-auto mb-4 w-full max-w-screen-lg text-center">
						<FormContact ordersite={ordersite} />
					</div>
				</div>
			)}
		</section>
	)
}

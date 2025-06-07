import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Asset from './Asset'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'
import { CgSlack } from 'react-icons/cg'

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	assets,
	assetOnRight,
	assetBelowContent,
	backgroundColor,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
	assetOnRight: boolean
	assetBelowContent: boolean
	backgroundColor: string
}>) {
	const asset = assets?.[0]
	return (
		<section style={{ backgroundColor: backgroundColor || '#ffffff' }}>
			<div className="section section-herosplit grid items-center gap-8 md:grid-cols-2 md:gap-x-12">
				<figure
					className={cn(
						asset?._type === 'img' &&
							'max-md:full-bleed overflow-hidden rounded-xl max-md:rounded-none',
						assetOnRight && 'md:order-1',
						assetBelowContent && 'max-md:order-last',
					)}
				>
					<Asset asset={asset} />
				</figure>

				<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText
						value={content}
						components={{
							types: {
								'custom-html': ({ value }) => <CustomHTML {...value} />,
								'reputation-block': ({ value }) => (
									<Reputation className="!mt-4" reputation={value.reputation} />
								),
							},
						}}
					/>
					<CTAList ctas={ctas} className="!mt-6" />
				</div>
			</div>
		</section>
	)
}

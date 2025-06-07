import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn, formatCurrency } from '@/lib/utils'

export default function PricingProduct({
	_key,
	title,
	highlight,
	price,
	ctas,
	content,
	...props
}: Partial<{
	highlight: string
	title: string
	price: any
	ctas: any
	content: any
}> &
	Sanity.Module) {
	return (
		<section
			className="section section-price space-y-8"
			{...moduleProps(props)}
		>
			<article
				className="border-ink/10 richtext space-y-4 rounded border p-4"
				key={_key}
			>
				<h1 className="h3 text-md flex flex-wrap items-center gap-x-4">
					{title}
					<Pretitle className="ms-auto text-xs">{highlight}</Pretitle>
				</h1>

				{price?.base !== undefined && (
					<div className="flex flex-wrap items-end gap-x-1">
						{price.base !== undefined && !isNaN(price.base) && (
							<b className="h1 text-red-500">{formatPrice(price.base)}</b>
						)}
						{price.suffix && (
							<span className={cn(isNaN(price.base) && 'h1')}>
								{price.suffix}
							</span>
						)}
						{price.strikethrough && (
							<s className="pl-2 font-bold decoration-red-500">
								{formatPrice(price?.strikethrough)}
							</s>
						)}
					</div>
				)}

				<CTAList className="grid" ctas={ctas} />
				<div className="richtext">
					<PortableText value={content} />
				</div>
			</article>
		</section>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return formatCurrency(value).replace(/\.00$/, '')
}

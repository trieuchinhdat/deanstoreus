import { Img } from '@/ui/Img'
import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { cn } from '@/lib/utils'

export default function ProductPreview({
	product,
	skeleton,
}: {
	product?: Sanity.ProductDetail
	skeleton?: boolean
}) {
	if (!product && !skeleton) return null

	return (
		<div className="group border-global-style relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg">
			<figure className="bg-ink/3 relative aspect-square overflow-hidden transition-all group-hover:scale-105">
				<Img
					className="h-full w-full object-cover transition-all"
					image={product?.metadata.image}
					width={800}
					alt={product?.metadata.title}
				/>
			</figure>
			<div className="p-4 sm:p-6">
				<div className={cn('h4 mb-2', skeleton && 'skeleton-2')}>
					<Link
						className="link-global text-lg sm:text-xl"
						href={resolveUrl(product, { base: false })}
					>
						<span className="absolute inset-0" />
						{product?.metadata.title}
					</Link>
				</div>
				<div className="grow">
					<p className="line-clamp-3 text-sm">
						{product?.metadata.description}
					</p>
				</div>
			</div>
		</div>
	)
}

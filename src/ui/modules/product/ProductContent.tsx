import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './ProductContent.module.css'

export default function ProductContent({
	product,
	...props
}: { product?: Sanity.ProductDetail } & Sanity.Module) {
	if (!product) return null
	return (
		<div className="product-template" {...moduleProps(props)}>
			{/* <header className="section space-y-6 text-center">
				<h1 className="h1 text-balance">{product.metadata.title}</h1>
			</header> */}

			<div className={cn('grid gap-8 p-4')}>
				<Content
					value={product.body}
					title={product.metadata.title}
					className={cn(css.body, 'grid max-w-screen-lg')}
				>
					<hr />
				</Content>
			</div>
		</div>
	)
}

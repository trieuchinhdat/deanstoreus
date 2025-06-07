'use client'

import ProductPreview from '../ProductPreview'
import { useProductFilters } from '../store'

export default function List({
	productlist,
	...props
}: {
	productlist: Sanity.ProductDetail[]
} & React.ComponentProps<'ul'>) {
	const filtered = filterProductList(productlist)

	if (!filtered.length) {
		return <div>No products found...</div>
	}

	return (
		<ul {...props}>
			{filtered?.map((product) => (
				<li className="anim-fade" key={product._id}>
					<ProductPreview product={product} />
				</li>
			))}
		</ul>
	)
}

export function filterProductList(productlist: Sanity.ProductDetail[]) {
	const { category } = useProductFilters()

	return productlist.filter((product) => {
		if (category !== 'All')
			return product.categories?.some(({ slug }) => slug?.current === category)

		if (category !== 'All')
			return product.categories?.some(({ slug }) => slug?.current === category)

		return true
	})
}

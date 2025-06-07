import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import ProductList from './product/ProductList'
import ProductContent from './product/ProductContent'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CardList from './CardList'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import RichtextModule from './RichtextModule'
import ScheduleModule from './ScheduleModule'
import SearchModule from './SearchModule'
import StatList from './StatList'
import StepList from './StepList'
import TabbedContent from './TabbedContent'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'
import ImageList from './ImageListWrapper'
import ActionBuy from './ActionBuy'
import OrderForm from './product/OrderForm'

import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'
import RatingsReviewsWrap from './product/RatingsReviewsWrap'

const MODULE_MAP = {
	'accordion-list': AccordionList,
	'blog-frontpage': BlogFrontpage,
	'blog-list': BlogList,
	'blog-post-content': BlogPostContent,
	'product-list': ProductList,
	'product-content': ProductContent,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'card-list': CardList,
	'creative-module': dynamic(() => import('./CreativeModule')),
	'custom-html': CustomHTML,
	'flag-list': FlagList,
	hero: Hero,
	'hero.split': HeroSplit,
	'hero.saas': HeroSaaS,
	'logo-list': LogoList,
	'person-list': dynamic(() => import('./PersonList')),
	'pricing-list': dynamic(() => import('./PricingList')),
	'richtext-module': RichtextModule,
	'schedule-module': ScheduleModule,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
	'tabbed-content': TabbedContent,
	'testimonial-list': TestimonialList,
	'testimonial.featured': TestimonialFeatured,
	'image-list': ImageList,
	'action-buy': ActionBuy,
	'order-form': OrderForm,
	'ratings-reviews': RatingsReviewsWrap,
} as const

export default function Modules({
	modules,
	page,
	post,
	product,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
	product?: Sanity.ProductDetail
}) {
	const getAdditionalProps = (module: Sanity.Module) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'product-content':
				return { product }
			case 'breadcrumbs':
				return { currentPage: post || page || product }
			default:
				return {}
		}
	}
	// console.log(modules)
	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP]

				if (!Component) return null

				return (
					<Component
						{...module}
						{...getAdditionalProps(module)}
						data-sanity={
							!!page?._id &&
							createDataAttribute({
								id: page._id,
								type: page?._type,
								path: `page[_key == "${module._key}"]`,
							}).toString()
						}
						key={module._key}
					/>
				)
			})}
		</>
	)
}

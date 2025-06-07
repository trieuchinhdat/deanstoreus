import { PortableText } from 'next-sanity'
import AnchoredHeading from './AnchoredHeading'
import { cn } from '@/lib/utils'

import Image from './Image'
import Code from './Code'
import Admonition from './Admonition'
import CustomHTML from '@/ui/modules/CustomHTML'
import ImageListWrapper from '../ImageListWrapper'
import ActionBuy from '../ActionBuy'
import OrderForm from '../product/OrderForm'
import AccordionList from '../AccordionList'
import PricingProduct from '../product/PricingProduct'
import CardList from '../CardList'
import CreativeModule from '../CreativeModule'
import Hero from '../Hero'
import HeroSaaS from '../HeroSaaS'
import HeroSplit from '../HeroSplit'
import FlagList from '../FlagList'
import StepList from '../StepList'
import TestimonialFeatured from '../TestimonialFeatured'
import TabbedContent from '../TabbedContent'

export default function Content({
	value,
	title,
	className,
	children,
}: { value: any } & React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'richtext richtext-template mx-auto w-full space-y-6 [&>:first-child]:!mt-0',
				className,
			)}
		>
			<PortableText
				value={value}
				components={{
					block: {
						h2: (node) => <AnchoredHeading as="h2" {...node} />,
						h3: (node) => <AnchoredHeading as="h3" {...node} />,
						h4: (node) => <AnchoredHeading as="h4" {...node} />,
						h5: (node) => <AnchoredHeading as="h5" {...node} />,
						h6: (node) => <AnchoredHeading as="h6" {...node} />,
					},
					types: {
						// Media
						image: Image,
						'image-list': ({ value }) => <ImageListWrapper {...value} />,

						// Content blocks
						admonition: Admonition,
						code: Code,
						'accordion-list': ({ value }) => <AccordionList {...value} />,
						'card-list': ({ value }) => <CardList {...value} />,
						'creative-module': ({ value }) => <CreativeModule {...value} />,
						'custom-html': ({ value }) => (
							<CustomHTML
								className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto"
								{...value}
							/>
						),
						'flag-list': ({ value }) => <FlagList {...value} />,
						'step-list': ({ value }) => <StepList {...value} />,
						'tabbed-content': ({ value }) => <TabbedContent {...value} />,
						// Hero types
						hero: ({ value }) => <Hero {...value} />,
						'hero.saas': ({ value }) => <HeroSaaS {...value} />,
						'hero.split': ({ value }) => <HeroSplit {...value} />,
						// Action blocks
						'action-buy': ({ value }) => <ActionBuy {...value} />,
						'order-form': ({ value }) => <OrderForm title={title} {...value} />,
						pricing: ({ value }) => <PricingProduct {...value} />,
					},
				}}
			/>

			{children}
		</div>
	)
}

import { type SchemaTypeDefinition } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import globalModule from './documents/global-module'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import productDetail from './documents/product.detail'
import productCategory from './documents/product.category'
import navigation from './documents/navigation'
import redirect from './documents/redirect'

// miscellaneous
import announcement from './misc/announcement'
import logo from './misc/logo'
import person from './misc/person'
import pricing from './misc/pricing'
import reputation from './misc/reputation'
import testimonial from './misc/testimonial'
import reviewlist from './modules/review-list'

// objects
import cta from './objects/cta'
import icon from './objects/icon'
import img from './objects/img'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleOptions from './objects/module-options'

// modules
import accordionList from './modules/accordion-list'
import blogFrontpage from './modules/blog-frontpage'
import blogList from './modules/blog-list'
import productList from './modules/product-list'
import blogPostContent from './modules/blog-post-content'
import productContent from './modules/product-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import personList from './modules/person-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import scheduleModule from './modules/schedule-module'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import tabbedContent from './modules/tabbed-content'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'
import imageList from './modules/image-list'
import actionBuy from './modules/action-buy'
import options from './objects/options'
import orderForm from './modules/order-form'
import ordersetting from './misc/ordersetting'
import reviewitem from './misc/reviewitem'
import ratingsReviews from './modules/ratings-reviews'

export const schemaTypes: SchemaTypeDefinition[] = [
	// documents
	site,
	page,
	globalModule,
	blogPost,
	blogCategory,
	productDetail,
	productCategory,
	navigation,

	// miscellaneous
	announcement,
	redirect,
	logo,
	person,
	pricing,
	reputation,
	testimonial,
	ordersetting,
	reviewitem,

	// objects
	cta,
	icon,
	img,
	link,
	linkList,
	metadata,
	moduleOptions,
	options,

	// modules
	accordionList,
	blogFrontpage,
	blogList,
	blogPostContent,
	productList,
	productContent,
	breadcrumbs,
	callout,
	cardList,
	creativeModule,
	customHtml,
	flagList,
	hero,
	heroSaas,
	heroSplit,
	logoList,
	personList,
	pricingList,
	reviewlist,
	ratingsReviews,
	richtextModule,
	scheduleModule,
	searchModule,
	statList,
	stepList,
	tabbedContent,
	testimonialFeatured,
	testimonialList,
	imageList,
	actionBuy,
	orderForm,
]

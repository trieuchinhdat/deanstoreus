import { fetchSanityLive } from './fetch'
import { groq } from 'next-sanity'
import errors from '@/lib/errors'
import { BLOG_DIR } from '@/lib/env'
import { PRODUCT_DIR } from '@/lib/env'

export const LINK_QUERY = groq`
	...,
	internal->{
		_type,
		title,
		metadata
	}
`

const NAVIGATION_QUERY = groq`
	title,
	items[]{
		${LINK_QUERY},
		link{ ${LINK_QUERY} },
		links[]{ ${LINK_QUERY} }
	}
`

export const IMAGE_QUERY = groq`
	...,
	'lqip': @.asset->metadata.lqip
`

const ASSET_IMG_QUERY = groq`
	...,
	image { ${IMAGE_QUERY} }
`

export const CTA_QUERY = groq`
	...,
	link{ ${LINK_QUERY} }
`

export const REPUTATION_QUERY = groq`
	_type == 'reputation-block' => { reputation-> }
`

export const MODULES_QUERY = groq`
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	_type == 'blog-list' => { filteredCategory-> },
	_type == 'product-list' => { filteredCategory-> },
	_type == 'breadcrumbs' => { crumbs[]{ ${LINK_QUERY} } },
	_type == 'callout' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		}
	},
	_type == 'card-list' => {
		cards[]{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'creative-module' => {
		modules[]{
			...,
			subModules[]{
				...,
				ctas[]{ ${CTA_QUERY} }
			}
		}
	},
	_type == 'hero' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		},
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		}
	},
	_type == 'hero.saas' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		},
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		}
	},
	_type == 'hero.split' => {
		content[]{
			...,
			${REPUTATION_QUERY}
		},
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		}
	},
	_type == 'logo-list' => { logos[]-> },
	_type == 'person-list' => { people[]-> },
	_type == 'pricing-list' => {
		tiers[]->{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'richtext-module' => {
		content[]{
			...,
			_type == 'image' => { ${IMAGE_QUERY} }
		},
		'headings': select(
			tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
				style,
				'text': pt::text(@)
			}
		),
	},
	_type == 'tabbed-content' => {
		tabs[]{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'testimonial.featured' => { testimonial-> },
	_type == 'testimonial-list' => { testimonials[]-> },
	_type == 'image-list' => {
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		},
		tiers->{
    title,
    highlight,
    price {
      base,
      strikethrough,
      suffix
    },
    ctas[] {
      ...,
    },
    content
  }
	},
	_type == 'action-buy' => { actionbuy[]-> },
	_type == 'form-module' => {
		...,
	},
	_type == 'ratings-reviews' => {
	reviews->{
		title,
		backgroundColor,
		reviewItems[]{
			...,
			content[]{
				...,
				_type == "image" => {
					"imageUrl": asset->url,
					"alt": alt
				}
			}
		}
	},
	product->{
		detail {
			...,
			image { ${IMAGE_QUERY} }
		}
	}
}
`

export const GLOBAL_MODULE_PATH_QUERY = groq`
	string::startsWith($slug, path)
	&& select(
		defined(excludePaths) => count(excludePaths[string::startsWith($slug, @)]) == 0,
		true
	)
`

export const TRANSLATIONS_QUERY = groq`
	'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
		'slug': metadata.slug.current,
		language
	}
`

export async function getSite() {
	const site = await fetchSanityLive<Sanity.Site>({
		query: groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{ ${CTA_QUERY} },
				headerMenu->{ ${NAVIGATION_QUERY} },
				footerMenu->{ ${NAVIGATION_QUERY} },
				chatbox->{ ${NAVIGATION_QUERY} },
				social->{ ${NAVIGATION_QUERY} },
				'ogimage': ogimage.asset->url,
				ordersite->{
					idorder,	
  				idordername,
					idorderphone,
					idorderemail,
					idorderaddress,
					idorderproduct,
					idorderoption1,
					idorderoption2,
					urlordergform,
					idnewletteremail,
					urlnewlettergform,
					idreviewsnameproduct,
					urlreviewsgform		
				},
			}
		`,
	})

	if (!site) throw new Error(errors.missingSiteSettings)

	return site
}

export async function getTranslations() {
	return await fetchSanityLive<Sanity.Translation[]>({
		query: groq`*[_type in ['page', 'blog.post', 'product.detail'] && defined(language)]{
			'slug': '/' + select(
				_type == 'blog.post' => '${BLOG_DIR}/' + metadata.slug.current,
				_type == 'product.detail' => '${PRODUCT_DIR}/' + metadata.slug.current,
				metadata.slug.current != 'index' => metadata.slug.current,
				''
			),
			'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
				'slug': '/' + select(
					_type == 'blog.post' => '${BLOG_DIR}/' + language + '/' + metadata.slug.current,
					_type == 'product.detail' => '${PRODUCT_DIR}/' + language + '/' + metadata.slug.current,
					metadata.slug.current != 'index' => language + '/' + metadata.slug.current,
					language
				),
				_type == 'blog.post' => {
					'slugBlogAlt': '/' + language + '/${BLOG_DIR}/' + metadata.slug.current
				},
				_type == 'product.detail' => {
					'slugProductAlt': '/' + language + '/${PRODUCT_DIR}/' + metadata.slug.current
				},
				language
			}
		}`,
	})
}

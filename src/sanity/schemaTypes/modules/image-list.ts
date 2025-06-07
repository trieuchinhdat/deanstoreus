import { defineField, defineType } from 'sanity'
import { FaImage } from 'react-icons/fa'

export default defineType({
	name: 'image-list',
	title: 'Image List',
	icon: FaImage,
	type: 'object',
	fields: [
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel', 'product'],
				layout: 'radio',
			},
			initialValue: 'grid',
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [{ type: 'img' }],
			validation: (Rule) => Rule.max(9),
		}),
		defineField({
			name: 'columnsdesktop',
			type: 'number',
			title: 'Columns Desktop',
			initialValue: 1,
			description: 'Max 3 columns for grid, 4 for carousel',
			hidden: ({ parent }) =>
				parent?.layout !== 'carousel' && parent?.layout !== 'grid',
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const parent = context?.parent as { layout?: string }
					if (typeof value !== 'number') {
						return 'Value is required and must be a number'
					}
					if (parent.layout === 'grid' && value > 3) {
						return 'Grid layout supports up to 3 columns only'
					}
					if (parent.layout === 'carousel' && value > 4) {
						return 'Carousel layout supports up to 4 columns only'
					}
					if (value < 1) {
						return 'Must be at least 1 column'
					}
					return true
				}),
		}),
		defineField({
			name: 'columnsmobile',
			type: 'number',
			title: 'Columns Mobile',
			initialValue: 1,
			description: 'Max 3 columns for grid, 4 for carousel',
			hidden: ({ parent }) =>
				parent?.layout !== 'carousel' && parent?.layout !== 'grid',
			validation: (Rule) =>
				Rule.custom((value, context) => {
					const parent = context?.parent as { layout?: string }
					if (typeof value !== 'number') {
						return 'Value is required and must be a number'
					}
					if (parent.layout === 'grid' && value > 3) {
						return 'Grid layout supports up to 3 columns only'
					}
					if (parent.layout === 'carousel' && value > 4) {
						return 'Carousel layout supports up to 4 columns only'
					}
					if (value < 1) {
						return 'Must be at least 1 column'
					}
					return true
				}),
		}),
		defineField({
			name: 'tiers',
			type: 'reference',
			to: [{ type: 'pricing' }],
			title: 'Product Tier',
			description: 'Select a product tier to display',
			hidden: ({ parent }) => parent?.layout !== 'product',
		}),
		defineField({
			name: 'autoplay',
			title: 'Autoplay for carousel ',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }) => parent?.layout !== 'carousel',
		}),
		defineField({
			name: 'lightbox',
			title: 'Lightbox Image for Grid & Carousel',
			description:
				'Enable lightbox image (disables link navigation when active)',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			media: 'assets.0.asset',
		},
		prepare({ media }) {
			return {
				title: 'Image List',
				subtitle: 'Up to 9 images',
				media,
			}
		},
	},
})

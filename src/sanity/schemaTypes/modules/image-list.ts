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
			name: 'columns',
			title: 'Columns Settings',
			type: 'object',
			fields: [
				{
					name: 'desktop',
					title: 'Desktop Columns',
					type: 'number',
					initialValue: 1,
					validation: (Rule) => Rule.min(1).max(4).required(),
				},
				{
					name: 'mobile',
					title: 'Mobile Columns',
					type: 'number',
					initialValue: 1,
					validation: (Rule) => Rule.min(1).max(4).required(),
				},
			],
			options: {
				columns: 2,
			},
			hidden: ({ parent }) =>
				parent?.layout !== 'carousel' && parent?.layout !== 'grid',
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
			name: 'fullscreen',
			title: 'Full Screen',
			type: 'boolean',
			initialValue: false,
		}),
		defineField({
			name: 'bordered',
			title: 'Bordered Images',
			type: 'boolean',
			initialValue: true,
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

import { defineField, defineType } from 'sanity'
import { FiShoppingCart } from 'react-icons/fi'

export default defineType({
	name: 'action-buy',
	title: 'Action Buy',
	icon: FiShoppingCart,
	type: 'object',
	fields: [
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['button', 'product'],
				layout: 'radio',
			},
			initialValue: 'button',
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [{ type: 'img' }],
			validation: (Rule) => Rule.max(1),
			hidden: ({ parent }) => parent?.layout !== 'product',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			hidden: ({ parent }) => parent?.layout !== 'product',
		}),
		defineField({
			name: 'basicInfoBtn',
			title: 'Title & URL',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				{
					name: 'title',
					type: 'string',
					title: 'Title',
				},
				{
					name: 'url',
					type: 'string',
					title: 'URL',
				},
			],
		}),
	],
	preview: {
		select: {
			media: 'assets.0.asset',
			layout: 'layout',
		},
		prepare(selection) {
			const { media, layout } = selection
			return {
				title: 'Action Buy',
				subtitle:
					layout === 'button'
						? 'Button CTA'
						: layout === 'product'
							? 'Product Display'
							: 'Unknown Layout',
				media,
			}
		},
	},
})

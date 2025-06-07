import { defineField, defineType } from 'sanity'
import { MdOutlineNoteAlt } from 'react-icons/md'
import { imageBlock } from '../fragments'

export default defineType({
	name: 'order-form',
	title: 'Form Contact',
	icon: MdOutlineNoteAlt,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'style' }],
	fields: [
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['form order', 'form contact'],
				layout: 'radio',
			},
			initialValue: 'form order',
			group: 'content',
		}),
		defineField({
			name: 'title',
			title: 'Order Product Title',
			type: 'string',
			description: 'If not set, the default title will be used.',
			initialValue: 'Order Product Default Title',
			validation: (Rule) => Rule.required(),
			hidden: ({ parent }) => parent?.layout !== 'form order',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, imageBlock, { type: 'custom-html' }],
			group: 'content',
		}),
		defineField({
			name: 'saleSettings',
			title: 'Settings Flash Sale',
			type: 'object',
			group: 'content',
			hidden: ({ parent }) => parent?.layout !== 'form order',
			options: {
				columns: 2,
			},
			fields: [
				{
					name: 'showCountdown',
					title: 'Show Countdown',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'lastSaleDate',
					title: 'Last Sale Date',
					type: 'datetime',
				},
			],
		}),
		defineField({
			name: 'option1',
			title: 'Option 1',
			type: 'array',
			of: [{ type: 'options' }],
			hidden: ({ parent }) => parent?.layout !== 'form order',
			group: 'content',
		}),
		defineField({
			name: 'option2',
			title: 'Option 2',
			type: 'array',
			of: [{ type: 'options' }],
			hidden: ({ parent }) => parent?.layout !== 'form order',
			group: 'content',
		}),
		defineField({
			name: 'assetOnLeft',
			type: 'boolean',
			description: 'Display the asset to the left of the content on desktop',
			initialValue: false,
			group: 'style',
			hidden: ({ parent }) => parent?.layout !== 'form order',
		}),
		defineField({
			name: 'widthStyle',
			title: 'Width style',
			description: 'If not set, the default width will be used.',
			type: 'string',
			initialValue: '100%',
			options: {
				list: [
					{ title: 'Default', value: '100%' },
					{ title: '40%', value: '40%' },
					{ title: '50%', value: '50%' },
					{ title: '60%', value: '60%' },
					{ title: '70%', value: '70%' },
					{ title: '80%', value: '80%' },
					{ title: '90%', value: '90%' },
				],
				layout: 'dropdown',
			},
			group: 'style',
		}),
		defineField({
			name: 'backgroundImage',
			title: 'Background Image',
			description: 'If not set, the default background image will be used.',
			type: 'string',
			group: 'style',
		}),
		defineField({
			name: 'backgroundColor',
			title: 'Background color',
			description: 'If not set, the default background color will be used.',
			type: 'string',
			group: 'style',
		}),
	],
	preview: {
		select: {
			title: 'content',
			layout: 'layout',
		},
		prepare(selection) {
			const { title, layout } = selection
			return {
				title: 'Form',
				subtitle:
					layout === 'form order'
						? 'Form Order'
						: layout === 'form contact'
							? 'Form Contact'
							: 'Unknown Layout',
			}
		},
	},
})

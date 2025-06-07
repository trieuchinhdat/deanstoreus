import { defineField, defineType } from 'sanity'
import { MdOutlineRateReview } from 'react-icons/md'
import { imageBlock } from '../fragments'

export default defineType({
	name: 'reviewitem',
	title: 'Review item',
	icon: MdOutlineRateReview,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Name Author',
			type: 'string',
		}),
		defineField({
			name: 'rating',
			title: 'Rating',
			type: 'number',
			validation: (Rule) => Rule.min(1).max(5).required(),
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, imageBlock],
		}),
		defineField({
			name: 'approved',
			title: 'Approved',
			type: 'boolean',
			initialValue: false,
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => ({
			title,
		}),
	},
})

import { defineField, defineType } from 'sanity'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'

export default defineType({
	name: 'product-content',
	title: 'Product content',
	icon: BsLayoutTextWindowReverse,
	type: 'object',
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
		}),
	],
	preview: {
		select: {
			uid: 'options.uid',
		},
		prepare: ({ uid }) => ({
			title: 'Product content',
			subtitle: uid && `#${uid}`,
		}),
	},
})

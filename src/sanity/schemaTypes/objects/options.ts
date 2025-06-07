import { defineField, defineType } from 'sanity'
import { VscLink } from 'react-icons/vsc'

export default defineType({
	name: 'options',
	title: 'Options',
	icon: VscLink,
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare(selection) {
			const { title } = selection
			return {
				title: title,
			}
		},
	},
})

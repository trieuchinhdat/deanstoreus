import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'ordersetting',
	title: 'Form settings',
	type: 'document',
	groups: [
		{ name: 'order', default: true },
		{ name: 'contact' },
		{ name: 'reviews' },
	],
	fields: [
		defineField({
			name: 'idorder',
			title: 'ID Order',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idordername',
			title: 'ID Order name',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderphone',
			title: 'ID Order phone',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderemail',
			title: 'ID Order email',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderaddress',
			title: 'ID Order address',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderproduct',
			title: 'ID Order product',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderoption1',
			title: 'ID Order option 1',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idorderoption2',
			title: 'ID Order option 2',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'urlordergform',
			title: 'Url order google form',
			type: 'string',
			group: 'order',
		}),
		defineField({
			name: 'idnewletteremail',
			title: 'ID Newletter email',
			type: 'string',
			group: 'contact',
		}),
		defineField({
			name: 'urlnewlettergform',
			title: 'Url newletter google form',
			type: 'string',
			group: 'contact',
		}),
		defineField({
			name: 'idreviewsnameproduct',
			title: 'ID Reviews Name Product',
			type: 'string',
			group: 'reviews',
		}),
		defineField({
			name: 'urlreviewsgform',
			title: 'Url reviews google form',
			type: 'string',
			group: 'reviews',
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Form settings',
		}),
	},
})

'use client'

import pkg from './package.json'
import { defineConfig } from 'sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { structure } from './src/sanity/structure'
import { presentation } from './src/sanity/presentation'
import { icon, infoWidget } from 'sanitypress-utils'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { media } from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { supportedLanguages } from '@/lib/i18n'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './src/sanity/schemaTypes'
import resolveUrl from '@/lib/resolveUrl'

const singletonTypes = ['site']

export default defineConfig({
	title: 'ADMIN',
	icon,
	projectId,
	dataset,
	basePath: '/admin',

	plugins: [
		structure,
		media(),
		// presentation,
		dashboardTool({
			name: 'deployment',
			title: 'Deployment',
			widgets: [vercelWidget()],
		}),
		dashboardTool({
			name: 'info',
			title: 'Info',
			widgets: [
				projectInfoWidget(),
				projectUsersWidget(),
				// infoWidget({ version: pkg.version }),
			],
		}),
		visionTool({ defaultApiVersion: apiVersion }),
		codeInput(),
		documentInternationalization({
			supportedLanguages,
			schemaTypes: ['page', 'blog.post', 'product.detail'],
		}),
	],

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},
	document: {
		productionUrl: async (prev, { document }) => {
			if (['page', 'blog.post', 'product.detail'].includes(document?._type)) {
				return resolveUrl(document as Sanity.PageBase, { base: true })
			}
			return prev
		},

		actions: (input, { schemaType }) => {
			if (singletonTypes.includes(schemaType)) {
				return input.filter(
					({ action }) =>
						action && ['publish', 'discardChanges', 'restore'].includes(action),
				)
			}

			return input
		},
	},
})

import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { LINK_QUERY } from '@/sanity/lib/queries'
import AnnouncementClient from './AnnouncementClient'

export default async function Announcement() {
	const announcements = await fetchSanityLive<
		(Sanity.Announcement & Sanity.Module)[]
	>({
		query: groq`*[_type == 'site'][0].announcements[]->{
			...,
			cta{ ${LINK_QUERY} },
		}`,
	})

	if (!announcements) return null

	return <AnnouncementClient announcements={announcements} />
}

import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { Img } from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'

export default function PostPreviewLarge({ post }: { post: Sanity.BlogPost }) {
	if (!post) return null

	return (
		<div className="group border-global-style relative isolate grid items-center overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg max-md:gap-0 md:grid-cols-2 dark:border-[#f1d1b1]/[0.2]">
			<figure className="max-md:full-bleed bg-ink/5 relative aspect-video overflow-hidden md:self-start">
				<Img
					className="aspect-video w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post.metadata.image}
					width={1200}
					alt={post.metadata.title}
					loading="eager"
				/>

				{post.featured && (
					<span className="action absolute top-0 right-4 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>

			<div className="mx-auto max-w-lg space-y-4 p-4 sm:p-6">
				<div className="h4">
					<Link
						className="link-global line-clamp-3 text-lg sm:text-xl"
						href={resolveUrl(post, { base: false })}
					>
						<span className="absolute inset-0" />
						{post.metadata.title}
					</Link>
				</div>

				<p className="line-clamp-4 max-md:text-sm">
					{post.metadata.description}
				</p>

				<div className="flex flex-wrap gap-x-4">
					<Date value={post.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={post.categories}
					/>
				</div>

				{post.authors?.length && (
					<Authors
						className="flex flex-wrap items-center gap-4"
						authors={post.authors}
					/>
				)}
			</div>
		</div>
	)
}

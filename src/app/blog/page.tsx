import { client } from '@/sanity/lib/client';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 3600; // Revalidate every hour

async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }
  `);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container py-12 dark mt-10 mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link href={`/blog/${post.slug.current}`} key={post._id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.mainImage && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                {post.excerpt && (
                  <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import PortableTextImage from '@/components/portable-text-image';
export const revalidate = 3600; // Revalidate every hour

async function getPost(slug: string) {
  return await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      mainImage,
      body,
      publishedAt
    }
  `, { slug });
}

export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "post"] {
      slug
    }
  `);
  
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

interface PageProps {
  params: {
    slug: string;
  }
}

const components = {
  types: {
    image: PortableTextImage
  },
};

export default async function BlogPost({ params }: PageProps) {
  const localparams = await params;
  const post = await getPost(localparams.slug);
  console.log(post.body.children);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container py-12 dark mt-10 mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      
      {post.mainImage && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      
      <div className="prose max-w-none">
        <PortableText value={post.body} components={components} />
      </div>
    </article>
  );
}
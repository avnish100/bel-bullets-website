// components/PortableTextImage.js (Example component)
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image'; // Import your urlFor helper

export default function PortableTextImage({ value }) { // 'value' holds the image data from Sanity
  if (!value?.asset?._ref) {
    return null; // Don't render if image data is invalid
  }

  // Use urlFor to generate the src
  const imageUrl = urlFor(value)
                     .fit('max') // Adjust fit, width, height as needed
                     .auto('format')
                     .url();

  // You might want to fetch dimensions for better next/image performance
  // Or provide sensible defaults/use layout='responsive'
  const width = value.asset.metadata?.dimensions?.width || 800; // Example default
  const height = value.asset.metadata?.dimensions?.height || 600; // Example default

  return (
    <figure style={{ margin: '2em 0' }}> {/* Example styling wrapper */}
      <Image
        src={imageUrl}
        alt={value.alt || ' '} // Use alt text from Sanity, provide fallback
        width={width}
        height={height}
        loading="lazy" // Good practice for inline images
        sizes="(max-width: 768px) 100vw, 800px" // Example sizes attribute
        // Add placeholder/blurDataURL if desired
      />
      {value.caption && (
        <figcaption style={{ fontSize: '0.9em', color: '#555', textAlign: 'center', marginTop: '0.5em' }}>
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
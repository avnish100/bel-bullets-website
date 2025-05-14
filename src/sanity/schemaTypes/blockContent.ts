// schemas/blockContent.js (or wherever your Portable Text schema is defined)
export default {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
      {
        title: 'Block',
        type: 'block', // Standard text blocks (paragraphs, headings, etc.)
        styles: [ // Define allowed text styles
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'Quote', value: 'blockquote' },
        ],
        lists: [ // Allow lists
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
        ],
        marks: { // Allow text decorators (bold, italic, links etc.)
          decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
          ],
          annotations: [ // Allow link annotations
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [{ title: 'URL', name: 'href', type: 'url' }],
            },
          ],
        },
      },
      // **** Add the image type here ****
      {
        type: 'image',
        options: { hotspot: true }, // Allow hotspot/crop for inline images too
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
            description: 'Important for SEO and accessibility.',
            options: { isHighlighted: true },
            validation: Rule => Rule.required(), // Make alt text required
          },
          {
            // Optional: Add a caption field
            name: 'caption',
            type: 'string',
            title: 'Caption',
            options: { isHighlighted: true },
          }
        ]
      },
      // You can add other custom block types here (e.g., code blocks, videos)
    ],
  }
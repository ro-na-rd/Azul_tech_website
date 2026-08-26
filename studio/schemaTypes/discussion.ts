import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'discussion',
  title: 'Sovereign Discussions',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category (e.g. Featured Briefing, Policy Analysis)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Video URL (YouTube, Vimeo, etc.)', value: 'url'},
          {title: 'Video File (MP4, WebM)', value: 'file'},
        ],
      },
      initialValue: 'url',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video hosting URLs (Visible if Media Type is URL)',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File Upload',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file (Visible if Media Type is File)',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. 18 min)',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Legacy External Link (URL)',
      type: 'url',
      description: 'Use Video URL instead for new entries',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

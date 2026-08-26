import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'interviewCard',
  title: 'Interview Card',
  type: 'object',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Executive Insights',
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      initialValue: '2024 Series',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
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
      description: 'YouTube, Vimeo, or other video hosting URLs',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File Upload',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
  ],
})

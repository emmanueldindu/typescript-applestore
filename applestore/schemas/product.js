export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Image',
      name: 'image',
      type: 'array',
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [
        {
       
          type: 'category',
        },
      ],
    },
    {
      title: 'Price',
      name: 'price',
      type: 'number',
    
 
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      
    },
    
  ] 
  


}


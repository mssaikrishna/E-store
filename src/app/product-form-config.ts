// product-form-config.ts
export const productFormConfig = [
    {
      type: 'text',
      name: 'title',
      label: 'Product Title',
      placeholder: 'Enter product title',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 100,
      },
    },
    {
      type: 'number',
      name: 'price',
      label: 'Price',
      placeholder: 'Enter product price',
      validation: {
        required: true,
        min: 0,
      },
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      placeholder: 'Enter product description',
      validation: {
        required: true,
        minLength: 10,
        maxLength: 500,
      },
    },
    {
      type: 'select',
      name: 'category',
      label: 'Category',
      options: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'],
      validation: {
        required: true,
      },
    },
  ];
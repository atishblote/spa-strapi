module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'devprabhat.info'),
          port: env('SMTP_PORT', 465),
          auth: {
            user: 'support@devprabhat.info',
            pass: 'X}uHu;e!]U$=',
          },
        },
        settings: {
          defaultFrom: 'support@devprabhat.info',
          defaultReplyTo: 'support@devprabhat.info',
        },
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
  
  });

  
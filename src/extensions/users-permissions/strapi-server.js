'use strict';

const jwt = require('jsonwebtoken'); // Import jwt to generate tokens

module.exports = (plugin) => {
  const fe_url = process.env.FRONTEND;

  // Override the default email confirmation controller
  plugin.controllers.auth.emailConfirmation = async (ctx) => {
    const { confirmationToken } = ctx.query;

    // Check if confirmationToken is provided
    if (!confirmationToken) {
      return ctx.badRequest('Missing confirmation token');
    }

    try {
      // Find the user with the confirmation token
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { confirmationToken },
      });

      if (!user) {
        // If user not found, redirect to frontend confirmation page
        return ctx.redirect(`${fe_url}/auth/confirm`);
      }

      // Update the user to confirm the email
      await strapi.query('plugin::users-permissions.user').update({
        where: { id: user.id },
        data: {
          confirmed: true,
          confirmationToken: null, // Clear the confirmation token
        },
      });

      // Generate a JWT token to log the user in
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET || strapi.config.get('plugin.users-permissions.jwtSecret'),
        {
          expiresIn: '1d', // Token expiration
        }
      );

      // Send the token and user data back to the client for automatic login
      ctx.send({
        jwt: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      return ctx.badRequest('An error occurred', err);
    }
  };

  return plugin;
};

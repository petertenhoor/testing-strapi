'use strict';

/**
 * Talk.js controller
 *
 * @description: A set of functions called "actions" for managing `Talk`.
 */

module.exports = {

  /**
   * Retrieve talk records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.talk.search(ctx.query);
    } else {
      return strapi.services.talk.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a talk record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.talk.fetch(ctx.params);
  },

  /**
   * Count talk records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.talk.count(ctx.query);
  },

  /**
   * Create a/an talk record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.talk.add(ctx.request.body);
  },

  /**
   * Update a/an talk record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.talk.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an talk record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.talk.remove(ctx.params);
  }
};

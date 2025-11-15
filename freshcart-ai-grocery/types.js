// types.js

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} brand
 * @property {string} name
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {string} imageUrl
 * @property {string} category
 * @property {string} description
 * @property {string} deliveryTime
 * @property {string} unit
 * @property {string} [offerTag]
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} imageUrl
 */

/**
 * @typedef {Product & { quantity: number }} CartItem
 */

/**
 * @typedef {Object} Recipe
 * @property {string} recipeName
 * @property {string} description
 * @property {string[]} ingredients
 * @property {string[]} instructions
 */

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} email
 */

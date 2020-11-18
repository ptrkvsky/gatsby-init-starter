// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/templates/Post.jsx')
  const categoryTemplate = require.resolve('./src/templates/Category.jsx')

  const result = await wrapper(
    graphql(`
      {
        allPrismicPost {
          edges {
            node {
              uid
              data {
                categories {
                  category {
                    uid
                  }
                }
              }
            }
          }
        }
      }
    `)
  )

  const categorySet = new Set()
  const postsList = result.data.allPrismicPost.edges

  // Double check that the project has a category assigned
  postsList.forEach(edge => {
    if (edge.node.data.categories[0].category.uid) {
      edge.node.data.categories.forEach(cat => {
        categorySet.add(cat.category.uid)
      })
    }

    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `/blog/${edge.node.data.categories[0].category.uid}/${edge.node.uid}`,
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        category: edge.node.data.categories[0].category.uid,
      },
    })
  })

  const categoryList = Array.from(categorySet)

  categoryList.forEach(category => {
    createPage({
      path: `/blog/${category}`,
      component: categoryTemplate,
      context: {
        categoryUid: category,
      },
    })
  })
}

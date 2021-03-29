const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogList = path.resolve(`./src/templates/blog-list.js`)
  const portofolioList = path.resolve(`./src/templates/portofolio-list.js`)
  const certificateList = path.resolve(`./src/templates/certificate-list.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              template
              title
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create markdown pages
  const posts = result.data.allMarkdownRemark.edges
  let blogPostsCount = 0
  let portoPostCount =0
  let certiPostCount =0

  posts.forEach((post, index) => {
    const id = post.node.id
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.slug,
      component: path.resolve(
        `src/templates/${String(post.node.frontmatter.template)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        previous,
        next,
      },
    })

    // Count blog posts.
    if (post.node.frontmatter.template === 'blog-post') {
      blogPostsCount++
    }
    // Porto coun post
    if (post.node.frontmatter.template === 'portofolio-post') {
      portoPostCount++
    }
    // certi count post
    if (post.node.frontmatter.template === 'certificate-post') {
      certiPostCount++
    }
  })

  // Create blog-list pages
  const postsPerPage = 9
  const numPages = Math.ceil(blogPostsCount / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: blogList,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create porto-list pages
  const portopostsPerPage = 9
  const numPages1 = Math.ceil(portoPostCount / portopostsPerPage)

  Array.from({ length: numPages1 }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/portofolio` : `/portofolio/${i + 1}`,
      component: portofolioList,
      context: {
        limit: portopostsPerPage,
        skip: i * portopostsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create certi-list pages
  const certipostsPerPage = 9
  const numPages2 = Math.ceil(certiPostCount / certipostsPerPage)

  Array.from({ length: numPages2 }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/certificate` : `/certificate/${i + 1}`,
      component: certificateList,
      context: {
        limit: certipostsPerPage,
        skip: i * certipostsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
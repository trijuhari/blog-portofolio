import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query AboutQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
			html
			excerpt(pruneLength: 140)
      frontmatter {
        title
				featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
              width: 300
              height: 300 
            )
          }
        }
      }
    }
  }
`



const AboutPage = ({ data }) => {
	const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
	const Image = frontmatter.featuredImage
  ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
  : ""
	return (
		<Layout className="page">
			<SEO
				title={frontmatter.title}
				description={excerpt}
			/>
      <div className="about-banner grids col-1 sm-2">
				<div>
					<h1>{frontmatter.title}</h1>
					<article dangerouslySetInnerHTML={{ __html: html }} />
				</div>
				<div style= {{marginLeft: "10%"}}>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : ""}
        </div>
			</div>
		</Layout>
	)
}

export default AboutPage
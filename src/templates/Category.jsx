import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'

const Category = ({ data: { prismicCategory } }) => (
  <>
    <SEO
      title={prismicCategory.data.meta_title}
      description={prismicCategory.data.meta_description}
    />
    Lorem
    {/* <CategoryContent
      allPrismicPost={allPrismicPost.edges}
      prismicCategory={prismicCategory.data}
    /> */}
  </>
)

// export const query = graphql`
//   query CategoryByUid($categoryUid: String!) {
//     prismicCategory(uid: { eq: $categoryUid }) {
//       id
//       data {
//         meta_title
//         meta_description
//         name
//         description {
//           text
//           html
//         }
//       }
//     }
//     allPrismicPost(

//     ) {
//       edges {
//         node {
//           uid
//           data {
//             post_title {
//               html
//               text
//             }
//             post_preview_description {
//               html
//               text
//             }
//             post_date
//           }
//         }
//       }
//     }
//   }
// `
Category.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Category

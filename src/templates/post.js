import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { DiscussionEmbed } from 'disqus-react';

export default ({ data }) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: data.datoCmsBlog.slug, title: data.datoCmsBlog.title }
  };

  return (
    <Layout>
      <article className="sheet">
        <HelmetDatoCms seo={data.datoCmsBlog.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{data.datoCmsBlog.title}</h1>
          <p className="sheet__lead">{data.datoCmsBlog.excerpt}</p>
          <div className="sheet__slider">
            <Slider infinite={true} slidesToShow={2} arrows>
              {data.datoCmsBlog.gallery.map(({ fluid }) => (
                <img alt={data.datoCmsBlog.title} key={fluid.src} src={fluid.src} />
              ))}
            </Slider>
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsBlog.descriptionNode.childMarkdownRemark.html,
            }}
          />
        </div>
            <DiscussionEmbed {...disqusConfig} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($slug: String!) {
    datoCmsBlog(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`

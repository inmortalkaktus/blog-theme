import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import { FeatureImageWrapper } from "../elements"

export const FeatureImage = ({ image, alt, hideOnMobile }) => {

    const data = useStaticQuery(graphql`
        {
            file(relativePath: { eq: "default.jpeg" }) {
                childImageSharp {
                    gatsbyImageData
                }
            }
        }
    `)

    return (
        <FeatureImageWrapper hideOnMobile={ hideOnMobile }>
            <GatsbyImage 
                image={ image ? image : data.file.childImageSharp.gatsbyImageData } 
                alt={ alt ? alt : "" }
                loading="eager"
                fadeIn={ false }
                decoding="async"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%"
                }} 
            />
        </FeatureImageWrapper>
    )
}
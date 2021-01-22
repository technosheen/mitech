import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from "gatsby"
import {Container, Row, Col} from 'react-bootstrap'
import SectionTitle from '../../../components/ui/section-title'
import Demo from '../../../components/demo'
import {DemoAreaWrap} from './inner-demo-area.style'

const DemoArea = ({sectionTitle}) => {
    const demoData = useStaticQuery(graphql `
    query InnerDemoQuery {
        landingJson(id: {eq: "inner-demos"}) {
          items {
            id
            title
            path
            desc
            image {
              childImageSharp {
                fluid(maxWidth: 480, maxHeight: 338, quality: 100) {
                  presentationWidth
                  presentationHeight
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
    }  
    `);

    const demos = demoData.landingJson.items;
   
    return (
        <DemoAreaWrap id="section-demos">
            <Container>
                <Row>
                    <Col lg={12}>
                        <SectionTitle
                            {...sectionTitle}
                            subtitle="Inner Pages"
                            title="<span>Different Inner Pages</span> With Dynamic Single Pages. <br/> And More is coming"
                        />
                    </Col>
                </Row>
                <Row>
                    {demos.map(demo => {
                        return (
                            <Col lg={4} md={6} key={`inner-demo-${demo.id}`}>
                                <Demo content={demo}/>
                            </Col>
                        )
                    })}
                </Row>

            </Container>
        </DemoAreaWrap>
    )
}

DemoArea.propTypes = {
    sectionTitle: PropTypes.object
}

DemoArea.defaultProps = {
    sectionTitle: {
        mb: '40px'
    }
}

export default DemoArea;
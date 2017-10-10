import React, { Component } from 'react'
import Prismic from 'prismic-javascript'
// import Project from './Project'

// const createProject = (title, cover, background) => {
//   return {
//     title,
//     cover,
//     background
//   }
// }

class Project extends React.Component {
  render (props = this.props) {
    console.log(props.data)
    const title = props.data.title[0].text
    return (
      <div>
        <p>{title}</p>
      </div>
    )
  }
}

class Projects extends Component {
  state = {
    projects: []
  }
  componentDidMount () {
    this.props.api.query(
      Prismic.Predicates.at('document.type', 'project')
    ).then( response => {
      this.setState({
        projects: response.results
      })
    })
  }

  render (props = this.props) {
    return (
      <div>
        {this.state.projects.map(project =>
          <Project data={project.data} key={project.id} />
        )}
      </div>
    )
  }
}

export default Projects

import React from 'react';
import axios from 'axios';
import Project from './Project';

export default class ProjectList extends React.Component {
    state = {
        projects: []
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/projects")
        .then(res => {
            console.log(res.data);
            this.setState({ projects: res.data});
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {this.state.projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        )
    }
}

function ProjectCard({ project }) {
    return (
        <Project project={project} />
    )
}
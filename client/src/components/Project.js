import React from 'react';
import './Project.css';

const Project = props => {
    console.log(props);
    const {name, description} = props.project;

    return (
        <div className="project-card">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    )
}
export default Project;
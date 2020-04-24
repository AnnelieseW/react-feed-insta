import React from 'react';

export default class Img extends React.Component {
    render() {
        return(
            <img style={{width: this.props.width}} src={this.props.thumbnail_src}/>
        )
    }
}
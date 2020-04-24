import React from 'react';
import cheerio from 'cheerio'
import request from 'request-promise'

import Img from "./img";


export default class InstaFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            imgArray:[],
            type: this.props.type,
            imgWidth: this.props.imgWidth
        };
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
    }

   async handleLoad(){

        const base_url = `https://www.instagram.com/${this.state.name}`;
        const response = await request (
            base_url,
            {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'cache-control': 'max-age=0',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
            }
        );

        const $ = cheerio.load(response);
        let script =  $('script').eq(4).html();

        let { entry_data: { ProfilePage : {[0] : { graphql : {user}}}}} =
             await JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);
        this.setState({imgArray: user.edge_owner_to_timeline_media.edges})
    }

    render(){
        return(
            <div>
                {this.state.imgArray.map(img => {
                    return <Img thumbnail_src = {img.node.thumbnail_src} width={this.state.imgWidth}/>
                })}
            </div>
        )
    }
}
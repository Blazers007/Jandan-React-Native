/**
 * Created by Blazers on 2015/12/30.
 */
'use strict';

import React from 'react-native';

const {
        Component,
        StyleSheet,
        Image,
    } = React;

// LightBox  https://github.com/oblador/react-native-lightbox

var LightBox = require('react-native-lightbox');

export class ImageLightBox extends Component {
    constructor(){
        super();
    }

    render() {
        let image;
        if (this.props.posts) {
            image = this.props.posts.map(post=>{
                return <Image/>
            });
        } else {
            image = <Image
                style={{ height: 300 }}
                source={{ uri: this.props.uri }}
            />
        }
        return(
            <LightBox navigator={this.props.navigator}>
                {image}
            </LightBox>
        )
    }

}

const styles = StyleSheet.create({

});
/**
 * Created by Blazers on 2015/12/25.
 * Props
 *  vote: {
 *      liked: boolean
 *      disliked: boolean
 *      favorite: boolean
 * }
 *
 */
'use strict';

import React from 'react-native';
const {
        Component,
        View,
        Text,
        Image,
        StyleSheet,
        TouchableHighlight,
    } = React;

export class CardBottomExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: this.props.liked || false,
            disliked: this.props.disliked || false,
            favorite: this.props.favorite || false
        }
    }

    render() {
        let up = this.state.liked ? require('image!ic_thumb_up_16dp') : require('image!ic_thumb_up_grey600_16dp');
        let down = this.state.disliked ? require('image!ic_thumb_down_16dp') : require('image!ic_thumb_down_grey600_16dp');
        let fav = this.state.favorite ? require('image!ic_favorite_16dp') : require('image!ic_favorite_grey600_16dp');
        let comment = require('image!ic_comment_grey600_16dp');
        return (
            <View style={{marginTop: 4}}>
                <View style={styles.divider}/>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TouchableHighlight style={styles.badgeViewTouchable}>
                            <View style={styles.badgeView}>
                                <Image
                                    source={up}
                                    style={styles.image}/>
                                <Text style={styles.badge}>0</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={down}
                                    style={styles.image}/>
                                <Text style={styles.badge}>0</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.badgeViewTouchable}>
                        <View style={styles.badgeView}>
                                <Image
                                    source={comment}
                                    style={styles.image}/>
                                <Text style={styles.badge}>0</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight>
                        <Image
                            source={fav}
                            style={styles.image}/>
                    </TouchableHighlight>
                </View>
                <View style={styles.divider}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftContainer: {
        flexDirection: 'row'
    },
    badgeViewTouchable: {
        marginLeft: 4
    },
    badgeView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badge: {
        color: '#757575',
        fontSize: 12
    },
    image: {
        width: 16,
        height: 16,
        margin: 12
    },
    divider: {
        height: 0.5,
        backgroundColor: '#e5e7e9'
    }
});

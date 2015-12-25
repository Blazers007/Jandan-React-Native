/**
 * Props
 *
 * - post {
 *      author: string
 *      date: string
 * }
 *
 * - shared: boolean
 *
 *
 * */

'use strict';

import React from 'react-native';

const {
        Component,
        StyleSheet,
        Text,
        View,
        Image,
        TouchableHighlight
    } = React;

export class CardUpperExtra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shared: this.props.shared
        }
    }

    render() {
        let icon = this.state.shared ? require('image!ic_share_16dp') : require('image!ic_share_grey600_16dp');
        return (
            <View style={{marginBottom: 2}}>
                <View style={styles.divider}/>
                <View style={styles.container}>
                    <View style={styles.authorDate}>
                        <Text style={styles.author}>@{this.props.post.comment_author}</Text>
                        <Text style={styles.date}>{this.calculateDate(this.props.post.comment_date)}</Text>
                    </View>
                    <TouchableHighlight>
                        <Image
                            style={styles.share}
                            source={icon}/>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    calculateDate(date) {
        return date;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    authorDate: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    author: {
        marginLeft: 16,
        color: '#222',
        fontWeight: 'bold',
        fontSize: 14,
    },
    date: {
        marginLeft: 12,
        color: '#666',
        fontSize: 12,
    },
    share : {
        width: 16,
        height: 16,
        margin: 12
    },
    divider: {
        height: 0.5,
        backgroundColor: '#e5e7e9'
    }
});
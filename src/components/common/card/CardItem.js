/**
 * Created by Blazers on 2015/12/25.
 */
'use strict';

import React from 'react-native';
const {
        Component,
        StyleSheet,
        View
    } = React;

export default class CardItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles.item}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        borderBottomWidth: 12,
        borderBottomColor: 'rgba(241,241,241,1)',
        backgroundColor: '#fff'
    }
});
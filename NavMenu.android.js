/**
 * Created by Blazers on 2015/12/30.
 */
'use strict';

import React from 'react-native';
const {
        Component,
        StyleSheet,
        View,
        Text,
        Image,
        TouchableHighlight
    } = React;

export class NavMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list = this.props.navListItems.map((item, index) => {
            return (
                <TouchableHighlight onPress={()=>this.props.onPress(index)} key={index}>
                    <View style={styles.item}>
                        <Image
                            style={styles.itemIcon}
                            source={item.icon}/>
                        <Text style={index === this.props.selectNavIndex ? styles.itemSelectedText : styles.itemText}>{item.text}</Text>
                    </View>
                </TouchableHighlight>
            )
        });
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                </View>
                {list}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    header: {
        height: 192,
        backgroundColor: '#328bff'
    },
    item: {
        flex: 1,
        height: 48,
        flexDirection: 'row',
        marginLeft: 16,
        alignItems: 'center'
    },
    itemIcon: {
        width: 18,
        height: 18,
        marginRight: 32
    },
    itemText: {
        color: '#4c4c4c'
    },
    itemSelectedText: {
        color: '#181818',
        fontWeight: 'bold'
    }
});
/**
 * Created by Blazers on 2015/12/30.
 */
'use strict';

import React from 'react-native';
const {
        Component,
        StyleSheet,
        View,
        ScrollView,
        Text,
        Image,
        TouchableNativeFeedback,
        InteractionManager
    } = React;

export default class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectNavIndex: this.props.selectNavIndex || 0
        }
    }
    render() {
        let list = this.props.navListItems.map((item, index) => {
            return (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple()}
                    onPress={()=>this._handleClick(index)}
                    key={index}>
                    <View style={styles.item}>
                        <Image
                            style={styles.itemIcon}
                            source={item.icon}/>
                        <Text style={index === this.state.selectNavIndex ? styles.itemSelectedText : styles.itemText}>{item.text}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        });
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                </View>
                {list}
            </ScrollView>
        )
    }

    _handleClick(index) {
        this.props.onPress(index);
        if (index !== this.state.selectNavIndex) {
            this.setState({
                selectNavIndex: index
            });
        }
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
        height: 48,
        flexDirection: 'row',
        paddingLeft: 16,
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
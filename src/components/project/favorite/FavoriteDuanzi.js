/**
 * Created by Blazers on 2016/1/6.
 */
'use strict';

import React from 'react-native';
const {
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    } = React;

import Database from './../../../utils/DatabaseUtil';

export default class FavoriteDuanzi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.temp)
        });
        Database.getFavedListByTypeOrderByDate('duanzi')
            .then(list => list.forEach(item => console.log(item)))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <ListView
                style={{flex: 1}}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}/>
        )
    }

    renderItem = (item) => {
        return (
            <Text style={styles.item}>{item}</Text>
        )
    };
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ccc',
        margin: 10,
        height: 150,
        width: 150
    }
});
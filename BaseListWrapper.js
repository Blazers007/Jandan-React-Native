/**
 * Created by Blazers on 2016/1/5.
 */
'use strict';
import React from 'react-native';

const {Component} = React;

//
import Static from './Static';

/**
 * 尝试抽象各页面的主要功能 通过继承方式减少重复代码
 * */
export default class BaseListWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loading: false
        }
    }


    fetchDataByTypeAndPage() {
        let url;
        switch (this.props.type) {
            case 'News':
                url = Static.getNewsUrlByPage(this.state.page)
        }
    }

}
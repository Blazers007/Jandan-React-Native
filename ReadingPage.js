/**
 * Created by Blazers on 2015/12/30.
 */
'use strict';

import React from 'react-native';
// 官方组件
const {
        Component,
        StyleSheet,
        DrawerLayoutAndroid,
        View,
        ToolbarAndroid,
        Text,
    } = React;
// 渐变色组件
import LinearGradient from 'react-native-linear-gradient';
// TabLayout组件
var ScrollableTabView = require('react-native-scrollable-tab-view');


// -- 自身组件
import {NewsPager} from './NewsPager.js';
import {NewsDetail} from './NewsDetail.android';

import {PicturePager} from './PicturePager.android';
import {ImageLightBox} from './ImageLightBox';

import {DuanziPager} from './DuanziPager.js';


// Const 常量
const toolbarActions = [
    {title: '离线阅读', icon: require('image!ic_inbox_black_18dp'), show: 'always'}
];
// Var Let 变量
let currentPager = 0;

export default class ReadingPage extends Component {



    render() {
        return (
            <DrawerLayoutAndroid
                ref='drawer'
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => this.props.renderNavDrawer(this.props.index)}>
                <DrawerLayoutAndroid
                    ref='drawerRight'
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Right}
                    renderNavigationView={() => this.renderDownload()}>
                    <View style={styles.container}>
                        <ToolbarAndroid
                            navIcon={require('image!ic_menu_black_18dp')}
                            title='煎蛋阅读'
                            titleColor='black'
                            style={styles.toolbar}
                            actions = {toolbarActions}
                            onIconClicked={() => this.refs.drawer.openDrawer()}
                            onActionSelected={this.onActionSelected}/>
                        <ScrollableTabView
                            initialPage={currentPager}
                            onChangeTab={(state)=>this.setSelectPager(state)}
                            style={styles.tabBar}
                            tabBarUnderlineColor='#434343'
                            tabBarActiveTextColor='#343434'
                            tabBarInactiveTextColor='#989898'>
                            <NewsPager tabLabel="新鲜事" nav={this.props.nav}/>
                            <PicturePager tabLabel="无聊图" nav={this.props.nav} type="wuliao"/>
                            <DuanziPager tabLabel="段子" type="wuliao"/>
                            <PicturePager tabLabel="梅志图" type="meizhi"/>
                        </ScrollableTabView>
                    </View>
                </DrawerLayoutAndroid>
            </DrawerLayoutAndroid>
        )
    }

    renderDownload() {
        return (
            <View>
                <Text>asdasd</Text>
            </View>
        )
    }

    onActionSelected(position) {
        //
    }

    setSelectPager(state) {
        currentPager = state.i;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    toolbar: {
        backgroundColor: "#fafafa",
        height: 56
    },
    tabBar: {
        backgroundColor: "#fafafa",
        height: 40
    },
    shadow: {
        height: 4
    }
});
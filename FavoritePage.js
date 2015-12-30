/**
 * Created by Blazers on 2015/12/30.
 */
'use strict';

import React from 'react-native';
const {
        Component,
        StyleSheet,
        DrawerLayoutAndroid,
        View,
        ToolbarAndroid,
        Text,
    } = React;


// Var Let 变量
let currentPager = 0;
export class FavoritePage extends Component {

    render() {
        return(
            <DrawerLayoutAndroid
                ref='drawer'
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <View style={styles.container}>
                    <ToolbarAndroid
                        navIcon={require('image!ic_menu_black_18dp')}
                        title='我的收藏'
                        titleColor='black'
                        style={styles.toolbar}
                        onIconClicked={() => this.refs.drawer.openDrawer()}
                        onActionSelected={this.onActionSelected}/>
                    <ScrollableTabView
                        initialPage={currentPager}
                        onChangeTab={(state)=>this.setSelectPager(state)}
                        style={styles.tabBar}
                        tabBarUnderlineColor='#434343'
                        tabBarActiveTextColor='#343434'
                        tabBarInactiveTextColor='#989898'>
                        <View tabLabel="新鲜事" nav={this.props.nav} />
                        <View tabLabel="图片" nav={this.props.nav} />
                        <View tabLabel="段子" nav={this.props.nav} />
                    </ScrollableTabView>
                </View>
            </DrawerLayoutAndroid>
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
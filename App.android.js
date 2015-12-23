/**
 * Created by Blazers on 2015/12/23.
 */
'use strict';

import React from 'react-native';

const {
        Component
    } = React;

export class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref='drawer'
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <DrawerLayoutAndroid
                    ref='drawerRight'
                    drawerWidth={200}
                    drawerPosition={DrawerLayoutAndroid.positions.Right}
                    renderNavigationView={() => navigationView}>
                    <View style={styles.container}>
                        <ToolbarAndroid
                            navIcon={require('image!ic_menu_black_18dp')}
                            title='煎蛋阅读'
                            titleColor='black'
                            style={styles.toolbar}
                            actions = {toolbarActions}
                            onIconClicked={() => this.refs.drawer.openDrawer()}
                            onActionSelected={this.onActionSelected}/>
                        <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']} style={styles.shadow}/>
                        <NewsPager nav={Navigator}/>
                    </View>
                </DrawerLayoutAndroid>
            </DrawerLayoutAndroid>
        )
    }
}

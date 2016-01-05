/**
 * Created by Blazers on 2016/1/5.
 */
'use strict';

import {AsyncStorage} from 'react-native';

const TIME_KEYS = {
    News
};

function Database5() {
    if (typeof Database5.instance === 'object') {
        return Database5.instance;
    }
    Database5.instance = this;
}

Database5.prototype.getLastRefreshTime = function(type){
    AsyncStorage.getItem()
};
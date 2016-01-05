/**
 * Created by Blazers on 2016/1/5.
 */
'use strict';

import {AsyncStorage} from 'react-native';



export default class Database {
    /**
     * return Promise对象 并返回是否需要刷新
     * */
    static isNeedToRefresh(KEY) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(KEY)
                .then(time => {
                    let lastDate = new Date(time);
                    console.log('Last refresh time ==============================>', lastDate, KEY);
                    resolve(new Date() - lastDate > 1000* 60 * 5);
                })
                .catch(err => resolve(true));
        });
    }

    /**
     * 保存刷新时间
     * */
    static saveRefreshTime(KEY) {
        AsyncStorage.setItem(KEY, new Date());
        console.log('Save Refresh Time', new Date(), KEY);
    }

    /**
     * 保存对应页码的对应数据
     * */
    static saveDataByKeyAndPage(data, key, page) {
        console.log('Save data to storage', key, page);
        if (typeof data == 'string') {
            AsyncStorage.setItem(key+'-'+page, data);
        } else {
            AsyncStorage.setItem(key+'-'+page, JSON.stringify(data));
        }
    }

    /**
     * 读取对应页码的对应数据
     * */
    static loadDataByKeyAndPage(key, page) {
        console.log('Load data from storage', key, page);
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key+'-'+page)
                .then(str => {
                    //console.log("Load >>>>>>", str);
                    if (!str)
                        return reject(new Error('No local data storage'));
                    resolve(JSON.parse(str));
                })
                .catch(err => reject(err));
        });
    }
}
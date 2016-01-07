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

    static setFavedOrNotByTypeAndId(faved, type, id, extra) {
        console.log('Set Faved =======> ', type, id);
        return new Promise((resolve, reject) => {
            let p;
            if (faved) {
                p = AsyncStorage.setItem('fav-'+type+id, JSON.stringify({
                    _id: id,
                    time: new Date(),
                    extra: extra
                }));
            } else {
                p = AsyncStorage.removeItem('fav-'+type+id);
            }
            p.then(()=>resolve(true)).catch(err=>resolve(false));
        });
    }

    static isThisTypeIdFaved(type, id) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('fav-'+type+id)
                .then(res => {resolve(res && true)})
                .catch(err=> resolve(false));
        });
    }


    /**
     * key = fav-[type]-id
     * value = {
     *      _id: _id,
     *      time: Date()
     * }
     * */
    static getFavedListByTypeOrderByDate(type, desc = true) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiGet(keys.filter(key => key.indexOf('fav-'+type) != -1)))
                .then(items => {
                    let list = items.map(item => JSON.parse(item[1]));
                    let sortedItems = list.sort((item1, item2) => {
                        if (item1.time > item2.time)
                            return desc? -1 : 1;
                        return desc? 1 : -1;
                    });
                    if (sortedItems)
                        return resolve(sortedItems);
                    reject(new Error('Error when find favorite list by type [', type, ']'));
                })
                .catch(err => reject(err));
        });
    }
}
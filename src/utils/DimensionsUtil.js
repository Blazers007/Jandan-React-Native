/**
 * Created by Blazers on 2016/1/7.
 */
'use strict';
import {Dimensions} from 'react-native';

export default class DimensionsUtil {

    /**
     * 根据要求返回大小 使用call 或 apply 来实现缓存减少计算量
     *
     * @param(cols) 每行的个数
     * @param(margin) 外边距 默认 0
     * @param(offset) 容器的内边距 默认0
     * */
    static generateRowItemStyle(cols, margin = 0, offset = 0) : Object {
        if (!this.itemStyle) {
            let {width} = Dimensions.get('window');
            let size = (width - offset - cols * 2 * margin )/cols;
            this.itemStyle = {
                margin: margin,
                height: size,
                width: size
            };
        }
        return this.itemStyle;
    }
}
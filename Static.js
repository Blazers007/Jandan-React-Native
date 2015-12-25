/**
 * Created by Blazers on 2015/12/23.
 */


/**
 * 根据页码获取URL
 * */
var NEWS_PREFIX = 'http://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=1&custom_fields=thumb_c,views&dev=1?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=';
var NEWS_SUFFIX = '&custom_fields=thumb_c,views&dev=1';

var WULIAO_PREFIX = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=';
var MEIZHI_PREFIX = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=';

var DUANZI_PREFIX = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_duan_comments&page=';

var Static = {
    getNewsUrlByPage : function(page) {
        return NEWS_PREFIX + page + NEWS_SUFFIX;
    },

    getWuliaoUrlByPage: function(page) {
        return WULIAO_PREFIX + page;
    },

    getMeizhiUrlByPage: function(page) {
        return MEIZHI_PREFIX + page;
    },

    getPictureUrlByPageAndType(page, type) {
        if (type === 'meizhi')
            return this.getMeizhiUrlByPage(page);
        return this.getWuliaoUrlByPage(page);
    },

    getDuanziUrlByPage(page) {
        return DUANZI_PREFIX + page;
    }

};

export default Static;
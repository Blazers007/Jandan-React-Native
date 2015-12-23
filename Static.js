/**
 * Created by Blazers on 2015/12/23.
 */


/**
 * 根据页码获取URL
 * */
var NEWS_PREFIX = 'http://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=1&custom_fields=thumb_c,views&dev=1?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=';
var NEWS_SUFFIX = '&custom_fields=thumb_c,views&dev=1';

var Static = {
    getNewsUrlByPage : function(page) {
        return NEWS_PREFIX + page + NEWS_SUFFIX;
    }
};

module.exports = Static;
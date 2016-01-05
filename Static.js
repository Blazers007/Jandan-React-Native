/**
 * Created by Blazers on 2015/12/23.
 */


/**
 * 根据页码获取URL
 * */
const NEWS_PREFIX = 'http://jandan.net/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=1&custom_fields=thumb_c,views&dev=1?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,comment_count,custom_fields&page=';
const NEWS_SUFFIX = '&custom_fields=thumb_c,views&dev=1';

const NEWS_CONTENT_PREFIX = 'http://i.jandan.net/?oxwlxojflwblxbsapi=get_post&id=';
const NEWS_CONTENT_SUFFIX = '&include=content';

const WULIAO_PREFIX = 'http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=';
const MEIZHI_PREFIX = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=';

const DUANZI_PREFIX = 'http://i.jandan.net/?oxwlxojflwblxbsapi=jandan.get_duan_comments&page=';



export default class Static {

    static getNewsUrlByPage(page) {
        return NEWS_PREFIX + page + NEWS_SUFFIX;
    }

    static getWuliaoUrlByPage(page) {
        return WULIAO_PREFIX + page;
    }

    static getMeizhiUrlByPage(page) {
        return MEIZHI_PREFIX + page;
    }

    static getPictureUrlByPageAndKey(page, type) {
        if (type === 'MeizhiList')
            return this.getMeizhiUrlByPage(page);
        return this.getWuliaoUrlByPage(page);
    }

    static getDuanziUrlByPage(page) {
        return DUANZI_PREFIX + page;
    }

    static getNewsContentUrl(id) {
        return NEWS_CONTENT_PREFIX + id + NEWS_CONTENT_SUFFIX;
    }

}
import Vue from 'vue'
import bus from '../../router/eventBus'
export default {
  longIn: function (user, pass, data, dataDetail) {
    // 登录
    try {
      Vue.http.get('/Node/login/cellphone', {
        params: {
          'phone': user,
          'password': pass
        },
        xhrFields: {
          withCredentials: true
        }
        // -------------------------
      }).then((res) => {
        data.push(res.data)
        // global.userData.splice(0, global.userData.length - 1)
        global.userData.push(res.data)
        this.userDetail(res.data.profile.userId, dataDetail)
        global.isLong = true
        // console.log(res)
      })
    } catch (e) {
      console.log(e)
    }
  },
  userDetail: function (uid, dataDetail) {
    // 用户详情
    Vue.http.get('/Node/user/detail', {
      params: {
        'uid': uid
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res.data)
      // global.dataDetail.splice(0, global.userData.length - 1)
      dataDetail.push(res.data)
      global.userDataDetail.push(res.data)
    })
  },
  getUserInfos: function (uid, p) {
    // 获取用户信息 , 歌单，收藏，mv, dj 数量
    Vue.http.get('/Node/user/playlist', {
      params: {
        'uid': uid
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
      for (let i = 0; i < res.data.playlist.length; i++) {
        if (i === 0) {
          p.push({
            'src': 'http://linkorg.oss-cn-beijing.aliyuncs.com/musicRec/heart.png',
            'name': res.data.playlist[i].name,
            'id': res.data.playlist[i].id,
            'isWy': true
          })
        } else {
          p.push({
            'src': 'http://linkorg.oss-cn-beijing.aliyuncs.com/musicRec/singlist.png',
            'name': res.data.playlist[i].name,
            'id': res.data.playlist[i].id,
            'isWy': true
          })
        }
      }
    })
  },
  updateLongIn: function () {
    // 刷新登录
    Vue.http.get('/Node/login/refresh', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res)
    })
  },
  getPersonalFm: function () {
    // 获取个人FM
    Vue.http.get('/Node/personal_fm', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
    })
  },
  getSearch: function (key, type, limit, result) {
    // 获取搜索结果
    Vue.http.get('/Node/search', {
      params: {
        'keywords': key,
        'type': type,
        'limit': limit
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      if (key === '') return
      if (type === 1) {
        for (let i = 0; i < res.data.result.songs.length; i++) {
          result.push({
            'id': res.data.result.songs[i].id,
            'name': res.data.result.songs[i].name,
            'auname': res.data.result.songs[i].artists[0].name,
            'auId': res.data.result.songs[i].artists[0].id
          })
        }
      } else if (type === 1000) {
        for (let i = 0; i < res.data.result.playlists.length; i++) {
          result.push({
            'id': res.data.result.playlists[i].id,
            'name': res.data.result.playlists[i].name
          })
        }
      } else if (type === 1004) {
        for (let i = 0; i < res.data.result.mvs.length; i++) {
          result.push({
            'name': res.data.result.mvs[i].name,
            'auname': res.data.result.mvs[i].artistName,
            'id': res.data.result.mvs[i].id
          })
        }
        // console.log(res)
      }
    })
  },
  dayRecommendList: function () {
    // 获取每日推荐歌单
    Vue.http.get('/Node/recommend/resource', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res)
    })
  },
  dayRecommendSong: function (p) {
    // 获取每日推荐歌曲
    Vue.http.get('/Node/recommend/songs', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
      for (let i = 0; i < res.data.recommend.length; i++) {
        p.push(res.data.recommend[i])
      }
    })
  },
  reCommendListSong: function (p) {
    // 获取用户推荐歌单 (需登录)
    Vue.http.get('/Node/personalized', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res.data.result)
      for (let i = 0; i < 14; i++) {
        p.push(res.data.result[i])
      }
    })
  },
  SongsDetail: function (id) {
    // 获取歌曲详情
    Vue.http.get('/Node/song/detail', {
      params: {
        'ids': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
      // this.artDetail(res.data.songs[0].ar[0].id)
    })
  },
  Getartists: function (id, img) {
    // 获取歌手单曲
    Vue.http.get('/Node/artists', {
      params: {
        'id': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
      img.push(res.data.artist.img1v1Url)
    })
  },
  SongSrcDetail: function (id, p) {
    // 获取歌曲播放链接
    Vue.http.get('/Node/music/url', {
      params: {
        'id': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res)
      // p.push(res.data.data[0].url)
    })
  },
  SongLyc: function (id, p) {
    // 获取歌曲歌词
    Vue.http.get('/Node/lyric', {
      params: {
        'id': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res)
      p.push(res.data.lrc.lyric)
    })
  },
  artDetail: function (id) {
    // 获取歌手详情
    Vue.http.get('/Node/artist/desc', {
      params: {
        'id': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res)
    })
  },
  ListSongDetail: function (id, p, d) {
    // 获取歌单详情
    Vue.http.get('/Node/playlist/detail', {
      params: {
        'id': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res.data.playlist)
      d.push({
        'img': res.data.playlist.coverImgUrl,
        'userImg': res.data.playlist.creator.avatarUrl,
        'description': res.data.playlist.description,
        'userName': res.data.playlist.name,
        'tags': res.data.playlist.tags,
        'name': res.data.playlist.creator.nickname,
        'createTime': res.data.playlist.createTime
      })
      for (let i = 0; i < res.data.playlist.tracks.length; i++) {
        p.push(res.data.playlist.tracks[i])
      }
    })
  },
  getHomePageImg: function (d) {
    // 获取banner图
    Vue.http.get('/Node/banner', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // d.push(res.data.banners)
      for (let i = 0; i < res.data.banners.length; i++) {
        d.push(res.data.banners[i].pic)
      }
      // console.log(res)
    })
  },
  friend: function (d) {
    // 获取朋友圈动态
    Vue.http.get('/Node/event', {
      params: {
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res.data.event)
      for (let i = 0; i < res.data.event.length; i++) {
        if (res.data.event[i].type === 18) {
          d.push(res.data.event[i])
        }
      }
    })
  },
  getMv: function (i, count, mvList) {
    // 获取最新MV
    Vue.http.get('/Node/mv/first', {
      params: {
        'limit': count + i
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res.data.data)
      for (; i < res.data.data.length; i++) {
        mvList.push(res.data.data[i])
      }
      // this.playMv(res.data.data[0].id)
    })
  },
  recommenMv: function (count, mvPList) {
    // mv排行榜
    Vue.http.get('/Node/top/mv', {
      params: {
        'limit': count
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res.data.data)
      for (let i = 0; i < res.data.data.length; i++) {
        mvPList.push(res.data.data[i])
      }
    })
  },
  resemble: function (mvid, reLevant) {
    // mv相似
    Vue.http.get('/Node/simi/mv', {
      params: {
        'mvid': mvid
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res.data.mvs)
      for (let i = 0; i < res.data.mvs.length; i++) {
        reLevant.push(res.data.mvs[i])
      }
    })
  },
  commentMv: function (mvid, count, comment, hotComment) {
    // mv评论
    Vue.http.get('/Node/comment/mv', {
      params: {
        'limit': count,
        'id': mvid
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      console.log(res.data)
      for (let i = 0; i < res.data.comments.length; i++) {
        comment.push(res.data.comments[i])
      }
      for (let i = 0; i < res.data.hotComments.length; i++) {
        hotComment.push(res.data.hotComments[i])
      }
    })
  },
  goodComment: function (id, cid, t, tpye) {
    // 评论点赞
    Vue.http.get('/Node/comment/like', {
      params: {
        'id': id,
        'cid': cid,
        't': t,
        'tpye': tpye
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      // console.log(res)
    })
  },
  playMv: function (id) {
    // 播放MV
    Vue.http.get('/Node/mv', {
      params: {
        'mvid': id
      },
      xhrFields: {
        withCredentials: true
      }
    }).then((res) => {
      bus.$emit('setMv', res.data.data)
      console.log(res.data.data)
    })
  }
}

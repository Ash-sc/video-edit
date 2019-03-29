<template>
  <div id="app">
    <div class="nav"></div>
    <section class="main-content">
      <el-input
        class="search-input"
        :class="!list.length && !list2.length ? 'no-content' : ''"
        size="mini"
        v-model="videoUrl"
        placeholder="请输入url地址，暂时只支持youtube页面"
      >
        <el-button slot="append" icon="el-icon-search" @click="commitLink"></el-button>
      </el-input>
      <div class="image-and-video" v-if="list.length || list2.length">
        <div class="image-section">
          <div class="unselected-image">
            <p class="section-title">视频片段：</p>
            <draggable
              class="list-group"
              tag="ul"
              v-model="list"
              v-bind="dragOptions"
              :move="onMove"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" :name="'flip-list'">
                <li
                  class="list-group-item"
                  v-for="ele in getList"
                  :key="ele.id"
                  :style="{ backgroundImage: `url(${ele.cover})`, opacity: ele.id === 'xxx' ? 0 : 1 }"
                >
                  <i class="el-icon-caret-right" @click.stop="playVideo(ele.url)"></i>
                </li>
              </transition-group>
            </draggable>
          </div>
          <div class="selected-image">
            <p class="section-title">已选择：</p>
            <draggable
              class="list-group"
              tag="ul"
              v-model="list2"
              v-bind="dragOptions"
              :move="onMove"
              @start="isDragging = true"
              @end="isDragging = false"
            >
              <transition-group type="transition" :name="'flip-list'">
                <li
                  class="list-group-item"
                  v-for="ele in getList2"
                  :key="ele.id"
                  :style="{ backgroundImage: `url(${ele.cover})`, opacity: ele.id === 'xxx' ? 0 : 1 }"
                >
                  <i class="el-icon-caret-right" @click.stop="playVideo(ele.url)"></i>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="video-play">
          <video :src="currentPlay" class="video-section" controls autoplay v-show="currentPlay"></video>
          <div class="video-section no-video" v-show="!currentPlay">请从左侧选择需要播放的视频片段</div>
        </div>
      </div>
      <el-button
        @click="downloadVideo"
        type="primary"
        size="mini"
        v-show="this.list2.length"
        class="download-btn"
      >下载视频</el-button>
      <a href="" download="download" id="download-video" target="_blank">download</a>
    </section>
  </div>
</template>

<script>
// import VideoPlay from './components/video-play'
import Draggable from 'vuedraggable'
import xhr from './service/axios'

export default {
  name: 'app',
  components: {
    // VideoPlay,
    Draggable
  },
  data () {
    return {
      videoUrl: '',
      currentPlay: '',
      isDragging: false,
      list: [],
      list2: [],
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      message: '',
      transitionId: ''
    }
  },

  computed: {
    getList () {
      return this.list.length ? this.list : [{ id: 'xxx' }]
    },
    getList2 () {
      return this.list2.length ? this.list2 : [{ id: 'xxx' }]
    }
  },

  methods: {
    commitLink () {
      if (!this.videoUrl) return false
      if (!(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.videoUrl))) {
        this.$message.error('错误的url格式')
        return false
      }
      this.currentPlay = ''
      xhr({
        url: 'http://101.132.46.62:9663/transitions',
        data: {
          url: this.videoUrl
        }
      }).then(data => {
        this.transitionId = data.id
        this.getTransitionStatus()
      }).catch(err => {
        console.error(err)
      })
    },
    getTransitionStatus() {
      const { transitionId } = this
      xhr({
        url: `http://101.132.46.62:9663/transitions/slice?id=${transitionId}`,
        method: 'get',
      }).then(res => {
        const { status, slices } = res
        if (res.status === 'processing' && slices && slices.length) {
          this.message && this.message.close()
          this.list = slices
        } else if (res.status === 'failed') {
          this.message && this.message.close()
          this.list = []
          this.$message.error('视频切片失败，请稍后再试...')
        } else {
          if (!this.message) {
            this.message = this.$message({
              message: '视频切片中，大概需要花费与视频时长相同时间...',
              type: 'info',
              duration: 1000 * 60 * 10
            })
          }
          setTimeout(() => {
            this.getTransitionStatus()
          }, 5000)
        }
      }).catch(err => {
        this.message && this.message.close()
        this.$message.error('视频切片失败，请稍后再试...')
        console.error(err)
      })
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    playVideo (link) {
      this.currentPlay = link
    },
    downloadVideo () {
      this.message = this.$message({
        message: '视频组合中...',
        type: 'info',
        duration: 1000 * 60 * 10
      })
      xhr({
        url: 'http://101.132.46.62:9663/concat',
        data: {
          videos: this.list2.map(item => item.id).filter(item => item)
        }
      }).then(data => {
        const aLink = document.querySelector('#download-video')
        aLink.setAttribute('href', data.url)
        aLink.click()
        this.message.close()
      }).catch(err => {
        console.error(err)
        this.$message.error('下载视频失败')
        this.message.close()
      })
    }
  }
}
</script>
<style lang="less">
.nav {
  height: 50px;
  background-image: linear-gradient(90deg, #3699ff, #72b8ff);
}
.main-content {
  margin: 20px;

  .search-input {
    width: 60vw;
    margin-left: calc(~'20vw - 20px');
    margin-bottom: 20px;
    transform: translateY(0);
    transition: transform .2s linear;
  }

  .no-content {
    transform: translateY(20vh);
  }

  .image-and-video {
    display: flex;

    .image-section {
      flex: 1;
      margin-right: 20px;
    }
    .unselected-image,
    .selected-image {
      padding: 20px 0 0 20px;
      border: 1px solid #3699ff;
      border-radius: 4px;
    }
    .selected-image {
      margin-top: 20px;
    }
    .section-title {
      margin-bottom: 20px;
    }
    .video-play {
      position: sticky;
      top: 50px;
      width: 600px;
    }
  }

  .list-group {
    min-height: 83px;
  }

  .list-group-item {
    position: relative;
    display: inline-block;
    margin: 0 20px 20px 0;
    width: 60px;
    height: 60px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transition: border-color .2s linear;
    cursor: grab;

    .el-icon-caret-right {
      position: absolute;
      bottom: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      margin: -12px;
      line-height: 24px;
      background: rgba(0,0,0,0.4);
      color: #fff;
      text-align: center;
      border-radius: 24px;
      cursor: pointer;
    }
  }

  .list-group-item:hover {
    border-color: #72b8ff;
  }

  .video-section {
    width: 100%;
    height: 338px;
    outline: none;
  }
  .no-video {
    border: 1px solid #eee;
    border-radius: 4px;
    line-height: 336px;
    text-align: center;
    color: #999;
  }
}
#download-video {
  display: inline-block;
  height: 0px;
  overflow: hidden;
  width: 0;
  position: fixed;
}
.download-btn {
  margin: 20px 0;
}
</style>

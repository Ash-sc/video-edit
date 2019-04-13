<template>
  <div
    id="app"
    v-loading.fullscreen="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(111, 111, 111, 0.2)"
  >
    <div class="nav"></div>
    <section class="main-content">
      <el-input
        class="search-input"
        :class="!list.length && !list2.length ? 'no-content' : ''"
        size="mini"
        v-model="videoUrl"
        placeholder="请输入url地址，暂时只支持youtube页面"
        @keyup.enter.native="commitLink"
      >
        <el-button slot="append" icon="el-icon-search" @click="commitLink"></el-button>
      </el-input>
      <div class="image-and-video" v-if="list.length || list2.length">
        <div class="image-section">
          <div class="unselected-image">
            <p class="section-title">
              视频片段：
              <el-button
                size="mini"
                @click="selectAll"
                v-show="list.length"
              >
                <i class="el-icon-circle-plus"></i> 全选
              </el-button>
            </p>
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
                  v-for="(ele, i) in list"
                  :key="i"
                  :style="{ backgroundImage: `url(${ele.cover})` }"
                  :class="ele.url === currentPlay ? 'playing' : ''"
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
              @start="dragStart"
              @end="isDragging = false"
            >
              <transition-group type="transition" :name="'flip-list'">
                <li
                  class="list-group-item"
                  v-for="(ele, i) in list2"
                  :key="i"
                  :style="{ backgroundImage: `url(${ele.cover})` }"
                  :class="ele.url === currentPlay ? 'playing' : ''"
                >
                  <i class="el-icon-caret-right" @click.stop="playVideo(ele.url)"></i>
                  <i class="el-icon-circle-close" @click.stop="removeVideo(i)"></i>
                </li>
              </transition-group>
            </draggable>
          </div>
          <el-button
            @click="mergeVideo"
            type="primary"
            size="mini"
            v-show="list2.length"
            class="download-btn"
          >合成视频</el-button>
          <el-checkbox
            class="watermark-checkbox"
            v-show="list2.length"
            v-model="watermark.show"
          >水印遮盖</el-checkbox>
        </div>
        <div class="video-play">
          <video :src="currentPlay" class="video-section" controls autoplay v-show="currentPlay"></video>
          <div class="video-section no-video" v-show="!currentPlay">请从左侧选择需要播放的视频片段</div>
          <div
            class="video-watermark"
            v-show="watermark.show"
          >
            <div
              class="water-mark-filter"
              :style="watermarkStyle"
              @mousedown="e =>setMoveWatermark(e, 'move')"
              @mouseup="e => setMoveWatermark(e, false)"
            >
              <i
                class="resize-btn"
                @mousedown.stop="e =>setMoveWatermark(e, 'resize')"
                @mouseup="e => setMoveWatermark(e, false)"
              ></i>
            </div>
          </div>
          <p class="section-title" style="margin: 10px 0;" v-show="downloadList.length">任务队列：</p>
          <ul>
            <li
              v-for="(item, index) in downloadList"
              :key="item.url"
              class="download-link"
              :class="`download-status-${item.status} ${ele.url === currentPlay ? 'playing' : ''}`"
            >
              视频 {{ index + 1 }} - ( {{ videoStatus[item.status] || '-' }} )
              <i class="el-icon-download" @click="downloadLink(item.url)"></i>
              <i class="el-icon-caret-right" @click="playVideo(item.url)"></i>
            </li>
          </ul>
        </div>
      </div>
      <a href="" download="download" id="download-video" target="_blank">download</a>
    </section>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import xhr from './service/axios'

export default {
  name: 'app',
  components: {
    Draggable
  },
  data () {
    return {
      loading: false,
      videoUrl: '',
      currentPlay: '',
      isDragging: false,
      list: [],
      listCache: [],
      list2: [],
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      message: '',
      transitionId: '',
      downloadList: [],
      videoStatus: {
        'splicing': '合成中...',
        'success': '合成成功',
        'fail': '合成失败',
      },
      moveWatermark: false,
      currentCursor: {
        x: 0,
        y: 0
      },
      watermark: {
        show: false,
        size: {
          width: 80,
          height: 28
        },
        position: {
          top: 20,
          left: 20
        },
        videoSize: {
          width: 600,
          height: 338
        }
      }
    }
  },

  watch: {
    list2: {
      handler(val) {
        this.list = [ ...this.listCache ]
      },
      deep: true
    }
  },

  computed: {
    watermarkStyle () {
      const { watermark: { size: { width, height }, position: { top, left } } } = this
      return {
        width: width + 'px',
        height: height + 'px',
        lineHeight: height - 2 + 'px',
        top: top + 'px',
        left: left + 'px',
      }
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
      this.loading = true
      xhr({
        url: '/transitions',
        data: {
          url: this.videoUrl
        }
      }).then(data => {
        this.transitionId = data.id
        this.list = []
        this.listCache = []
        this.getTransitionStatus()
      }).catch(err => {
        console.error(err)
        this.loading = false
      })
    },
    getTransitionStatus () {
      const { transitionId } = this
      xhr({
        url: `/transitions/slice?id=${transitionId}`,
        method: 'get',
      }).then(res => {
        const { status, slices = [] } = res

        if (['processing', 'finished', 'failed'].includes(status)) {
          const lastId = this.list.length ? this.list[this.list.length - 1].id : null
          const index = (lastId && slices.length) ?
            slices.findIndex(item => item.id === lastId) :
            -1
          this.list.push(...slices.slice(index + 1))
          this.listCache.push(...slices.slice(index + 1))
        }
        if (res.status === 'finished') {
          this.message && this.message.close() && (this.message = null)
          this.loading = false
          return true
        } else if (res.status === 'failed') {
          this.message && this.message.close() && (this.message = null)
          this.$message.error('视频切片失败，请稍后再试...')
          this.loading = false
          return false
        } else if (!this.message) {
          this.message = this.$message({
            message: '视频切片中，大概需要花费与视频时长相同时间...',
            type: 'info',
            duration: 1000 * 60 * 100
          })
        }
        setTimeout(() => {
          this.getTransitionStatus()
        }, 5000)
      }).catch(err => {
        this.message && this.message.close() && (this.message = null)
        this.$message.error('视频切片失败，请稍后再试...')
        console.error(err)
      })
    },
    selectAll () {
      this.list2.push( ...this.list)
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    dragStart (item, index) {
      this.isDragging = true

    },
    playVideo (link) {
      this.currentPlay = link
    },
    removeVideo (index) {
      this.list2.splice(index, 1)
    },
    setMoveWatermark (e, type) {
      this.moveWatermark = type
      this.currentCursor = {
        x: e.screenX,
        y: e.screenY
      }
    },
    movingWatermark (e) {
      if (!this.moveWatermark) return false
      const { watermark, currentCursor, moveWatermark } = this
      if (moveWatermark === 'move') {
        let left = watermark.position.left - (currentCursor.x - e.screenX)
        let top = watermark.position.top - (currentCursor.y - e.screenY)
        if (left < 0) left = 0
        if (top < 0) top = 0
        if (left + watermark.size.width > 600) left = 600 - watermark.size.width
        if (top + watermark.size.height > 338) top = 338 - watermark.size.height
        this.watermark = {
          ...watermark,
          position: {
            left,
            top
          }
        }
      } else if (moveWatermark === 'resize') {
        let width = watermark.size.width - (currentCursor.x - e.screenX)
        let height = watermark.size.height - (currentCursor.y - e.screenY)
        if (width < 20) width = 20
        if (height < 20) height = 20
        if (width + watermark.position.left > 600) width = 600 - watermark.position.left
        if (height + watermark.position.top > 338) height = 338 - watermark.position.top
        this.watermark = {
          ...watermark,
          size: {
            width,
            height
          }
        }
      }
      this.currentCursor = {
        x: e.screenX,
        y: e.screenY
      }
    },
    mergeVideo () {
      const videos = this.list2.map(item => item.id).filter(item => item)
      const videosString = videos.toString()
      if (!videos.length) return this.$message.error('没有找到已选择的片段id，请重新选择')
      if (this.downloadList.some(item => item.videos === videosString)) {
        return this.$message.error('该合成任务已在队列中，请勿重复提交')
      }

      this.downloadList.push({
        videos: videosString,
        status: 'splicing',
        url: ''
      })

      const mergeData = {
        videos: this.list2.map(item => item.id).filter(item => item)
      }
      const { watermark } = this
      if (watermark.show) mergeData.watermark = watermark

      xhr({
        url: '/concat',
        data: mergeData
      }).then(data => {
        const downloadInfo = this.downloadList.find(info => info.videos === videosString)
        if (!downloadInfo) return this.$message.error('合成视频失败')
        downloadInfo.url = data.url
        downloadInfo.status = 'success'
        this.$forceUpdate()
        this.$message.success('合成视频成功')
      }).catch(err => {
        const downloadInfo = this.downloadList.find(info => info.videos === videosString)
        if (!downloadInfo) return this.$message.error('合成视频失败')
        downloadInfo.status = 'fail'
        this.$message.error('合成视频失败')
        this.$forceUpdate()
      })
    },
    downloadLink (link) {
      const aLink = document.querySelector('#download-video')
      aLink.setAttribute('href', link)
      aLink.click()
    }
  },

  mounted () {
    document.body.addEventListener('mousemove', e => {
      this.movingWatermark(e)
    })
    document.body.addEventListener('mouseup', () => {
      this.moveWatermark = false
    })
  }
}
</script>
<style lang="less">
.nav {
  height: 50px;
  background-image: linear-gradient(90deg, #3699ff, #72b8ff);
}
.main-content {
  margin: 20px 20px 0 20px;

  .section-title {
    margin-bottom: 20px;
    position: sticky;
    left: 0;
  }

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
      max-width: calc(~'100vw - 640px');
      margin-right: 20px;
    }
    .unselected-image {
      max-height: calc(~'100vh - 340px');
      overflow: auto;
    }
    .unselected-image,
    .selected-image {
      padding: 20px 0 0 20px;
      border: 1px solid #3699ff;
      border-radius: 4px;
    }
    .selected-image {
      margin-top: 20px;
      overflow: auto;
    }
    .video-play {
      position: relative;
      width: 600px;
    }
    .video-section {
      width: 100%;
      height: 338px;
      position: relative;
    }
    .video-watermark {
      position: absolute;
      width: 100%;
      height: 338px;
      top: 0;
      pointer-events: none;
    }
    .water-mark-filter {
      position: absolute;
      pointer-events: visible;
      background-color: rgba(255,255,255, .5);
      text-align: center;
      border: 1px dashed #dadada;
      cursor: all-scroll;
    }
    .resize-btn {
      position: absolute;
      width: 6px;
      height: 6px;
      bottom: -3px;
      right: -3px;
      background-color: #fff;
      border: 1px solid #dadada;
      cursor: nwse-resize;
    }
  }

  .selected-image .list-group {
    white-space: nowrap;
  }

  .list-group {
    min-height: 83px;

    > span {
      display: inline-block;
      min-height: 60px;
      min-width: 100%;
    }
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

    &.playing {
      border-color: #72b8ff;
      box-shadow: 0 0 4px 4px #72b8ff;
    }

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

  .el-icon-circle-close {
    position: absolute;
    right: -6px;
    top: -6px;
    color: #8f8f8f;
    cursor: pointer;
    background: #fff;
    border-radius: 7px;
    &:hover {
      color: #5cb6ff;
    }
  }

  .select-all {
    cursor: pointer;
    text-align: center;
    line-height: 58px;
    vertical-align: top;
    font-size: 18px;
    color: #8f8f8f;
    &:hover {
      color: #5cb6ff;
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
    user-select: none;
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
.watermark-checkbox {
  margin-left: 20px;
}

.download-link {
  height: 28px;
  line-height: 26px;
  padding: 0 10px;
  border: 1px solid #eee;
  margin-top: 10px;
  border-radius: 4px;

  .el-icon-caret-right,
  .el-icon-download {
    float: right;
    margin: 7px 10px 0 0;
    color: #6cb4ff;
    cursor: pointer;
  }
}
.download-status-splicing,
.download-status-fail {
  .el-icon-caret-right,
  .el-icon-download {
    display: none;
  }
}

.download-status-success {
  color: #67C23A;
  border-color: #e1f3d8;
  background-color: #f5f9f3;
}

.download-status-fail {
  color: #F56C6C;
  border-color: #fde2e2;
  background-color: #fdf2f2;
}

@keyframes bg1 {
  0% {
    background: #f3faff;
  }
  50% {
    background: #cae9ff;
  }
  100% {
    background: #f3faff;
  }
}

.download-status-splicing {
  border-color: #b0d8f9;
  background: #f3faff;
  animation: bg1 2.5s linear infinite;
}
</style>

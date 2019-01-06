<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
  <div class="home-main">
    <Row class-name="home-page-row1" :gutter="10">
      <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
      <Card>
        <Row type="flex" class="user-infor">
          <Col span="4">
          <Row class-name="made-child-con-middle" type="flex" align="middle">
            <img class="avator-img" :src="avatorPath">
          </Row>
          </Col>
          <Col span="20" style="padding-left:6px;">
          <Row class-name="made-child-con-middle" type="flex" align="middle">
            <div>
              <b class="card-user-infor-name">Admin</b>
              <p>登录次数：988</p>
            </div>
          </Row>
          </Col>
        </Row>
        <div class="line-gray" />
        <Row class="margin-top-8">
          <Col span="8">
          <p class="notwrap">上次登录IP: 0:0:0:0:0:0:0:1 </p>
          </Col>
        </Row>
        <Row class="margin-top-8">
          <Col span="8">
          <p class="notwrap">上次登录时间: 2018-07-05 10:51:57</p>
          </Col>
        </Row>
      </Card>
      </Col>
    </Row>
    <Row :style="{marginBottom: '10px'}">
      <Col :span="24">
      <Card class="test">
        <p slot="title">
          <Icon type="ios-film-outline" /> 影像系统测试
        </p>
        <div class="test-list">
          <Row>
            <Col span="4">
            <span>html5上传</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/upload.img?token=upload_img_test_CLD002" target="_black">Html5影像上传demo [点击测试]</a>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>html5查看</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/view.img?token=view_img_test_CLD002" target="_black"> Html5影像查看demo [点击测试]</a>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>html5查看对比</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/view.img?token=view_img_test_004&compare=1" target="_black">Html5影像查看对比demo [点击测试]</a>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>html5上传-带标的</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/upload.img?token=upload_img_test_CL003" target="_black">Html5影像上传demo-带标的 [点击测试]</a>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>html5查看-带标的</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/view.img?token=view_img_test_CL003" target="_black">Html5影像查看demo-带标的 [点击测试]</a>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>flash上传</span>
            </Col>
            <Col span="20" class="test-url">
            <a href="http://localhost:8080/h5img/app/flash.img?token=upload_img_test_002" target="_black">Flash影像上传demo [点击测试]</a>
            </Col>
          </Row>
        </div>
      </Card>
      </Col>
    </Row>
    <Row>
      <Col :span="24">
      <Card class="test">
        <p slot="title">
          <Icon type="ios-film-outline" /> 服务器信息
        </p>
        <div class="test-list">
          <Row>
            <Col span="4">
            <span>系统访问地址</span>
            </Col>
            <Col span="20" class="test-url">
            <span>http://{{ serverName }}:{{ serverPort }} ({{ protocol }})</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务器IP地址</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ serverIP }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务器域名</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ serverName }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务器端口</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ serverPort }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>Web服务器版本</span>
            </Col>
            <Col span="20" class="test-url">
            <span>wildfly-10.1.0.Final</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>Java版本</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ javaVersion }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务器操作系统</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ osName }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务器当前时间</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ serverTime }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>客户端浏览器版本</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ browserInfo }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>服务已运行时间</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ runTime }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>CPU 总数</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ cpuCount }}</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>虚拟机内存情况</span>
            </Col>
            <Col span="20" class="test-url">
            <span>最大内存 {{ maxMem }}MB 已使用{{ usedMem }}MB 剩余{{ freeMem }}MB</span>
            </Col>
          </Row>
          <Row>
            <Col span="4">
            <span>当前SessionID</span>
            </Col>
            <Col span="20" class="test-url">
            <span>{{ sessionId }}</span>
            </Col>
          </Row>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import cityData from './map-data/get-city-value.js'
import homeMap from './components/map.vue'
import dataSourcePie from './components/dataSourcePie.vue'
import visiteVolume from './components/visiteVolume.vue'
import serviceRequests from './components/serviceRequests.vue'
import userFlow from './components/userFlow.vue'
import countUp from './components/countUp.vue'
import inforCard from './components/inforCard.vue'
import mapDataTable from './components/mapDataTable.vue'
import toDoListItem from './components/toDoListItem.vue'
import {welcome_new} from '@/api/login.js'
export default {
  name: 'Home',
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    serviceRequests,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data () {
    return {
      browserInfo: '',
      clientIP: '',
      cpuCount: '',
      freeMem: '',
      javaVersion: '',
      maxMem: '',
      osName: '',
      protocol: '',
      runTime: '',
      serverIP: '',
      serverName: '',
      serverPort: '',
      serverTime: '',
      sessionId: '',
      usedMem: '',
      userVo: ''
    }
  },
  created () {
    this.welcome()
  },
  computed: {
    avatorPath () {
      return localStorage.avatorImgPath
    }
  },
  methods: {
    welcome () {
      var that = this
      welcome_new()
        .then(function (response) {
          console.log(this)
          that.browserInfo = response.data.browserInfo
          that.clientIP = response.data.clientIP
          that.cpuCount = response.data.cpuCount
          that.freeMem = response.data.freeMem
          that.javaVersion = response.data.javaVersion
          that.maxMem = response.data.maxMem
          that.osName = response.data.osName
          that.protocol = response.data.protocol
          that.runTime = response.data.runTime
          that.serverIP = response.data.serverIP
          that.serverName = response.data.serverName
          that.serverPort = response.data.serverPort
          that.serverTime = response.data.serverTime
          that.sessionId = response.data.sessionId
          that.usedMem = response.data.usedMem
          that.userVo = response.data.userVo
        })
    },
    addNewToDoItem () {
      this.showAddNewTodo = true
    },
    addNew () {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        })
        setTimeout(() => {
          this.newToDoItemValue = ''
        }, 200)
        this.showAddNewTodo = false
      } else {
        this.$Message.error('请输入待办事项内容')
      }
    },
    cancelAdd () {
      this.showAddNewTodo = false
      this.newToDoItemValue = ''
    }
  }
}
</script>

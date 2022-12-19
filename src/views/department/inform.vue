<template>
  <div>
    <b-modal id="modal-department-inform" :title="getTitle" @ok="onSubmit">
      <div>
        <!-- 수정일 경우 해당 데이터의 값을 가져온다 -->
        <b-form-group v-if="inputMode === 'update'" label="id" label-for="id" label-cols="3">
          <b-form-input id="id" v-model="department.id" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="공장이름" label-for="name" label-cols="3">
          <b-form-input id="name" v-model="department.name"></b-form-input>
        </b-form-group>
        <b-form-group label="공장코드" label-for="code" label-cols="3">
          <b-form-select id="code" v-model="department.code" :options="options"> </b-form-select>
        </b-form-group>
        <!-- <b-form-group label="부서코드" label-for="code" label-cols="3" description="중복코드는 허용되지 않습니다.">
          <b-form-input id="code" v-model="department.code"></b-form-input>
        </b-form-group> -->
        <b-form-group label="상세설명" label-for="description" label-cols="3">
          <b-form-textarea id="description" v-model="department.description" rows="3" />
        </b-form-group>

        <b-form-group label="HOST" label-for="host" label-cols="3">
          <b-form-input id="host" v-model="department.host"></b-form-input>
        </b-form-group>
        <b-form-group label="PORT" label-for="port" label-cols="3">
          <b-form-input id="port" v-model="department.port"></b-form-input>
        </b-form-group>
        <b-form-group label="PATH" label-for="path" label-cols="3">
          <b-form-input id="path" v-model="department.path"></b-form-input>
        </b-form-group>
        <b-form-group
          label="TOPIC"
          label-for="topic"
          label-cols="3"
          description="2개 이상 작성 시 콤마(,)로 구분하세요."
        >
          <b-form-input id="topic" v-model="department.topic"></b-form-input>
        </b-form-group>

        <b-form-group v-if="inputMode === 'update'" label="등록일" label-for="createdAt" label-cols="3">
          <b-form-input id="createdAt" :value="getCreatedAt" disabled></b-form-input>
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      department: {
        id: null,
        name: null,
        code: null,
        description: null,
        host: null,
        port: null,
        path: null,
        topic: null,
        createdAt: null
      },
      options: [
        { value: 'uvc', text: 'uvc' },
        { value: 'metacamp', text: 'metacamp' }
      ]
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.Department
    },
    // 입력 상태
    inputMode() {
      return this.$store.getters.DepartmentInputMode
    },
    // 폼 제목
    getTitle() {
      let title = ''
      if (this.inputMode === 'insert') {
        title = '공장정보 입력'
      } else if (this.inputMode === 'update') {
        title = '공장정보 수정'
      }
      return title
    },
    getCreatedAt() {
      return this.department.createdAt && this.department.createdAt.substring(0, 10)
    }
  },
  watch: {
    // 모달이 열린 이후에 감지됨
    infoData(value) {
      this.department = { ...value }
    }
  },
  created() {
    // 모달이 최초 열릴때 감지됨
    this.department = { ...this.infoData }
  },
  methods: {
    onSubmit() {
      console.log('form is submitted', this.department)
      // 1. 등록인 경우
      if (this.inputMode === 'insert') {
        this.$store.dispatch('actDepartmentInsert', this.department) // 입력 실행
      }

      // 2. 수정인 경우
      if (this.inputMode === 'update') {
        this.$store.dispatch('actDepartmentUpdate', this.department) // 수정 실행
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

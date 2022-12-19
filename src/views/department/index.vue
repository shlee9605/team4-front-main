<template>
  <div>
    <b-container>
      <div class="department">
        <h1 class="title"><i class="bx bxs-factory bx-lg" style="padding-right: 10px"></i>공장 관리</h1>
        <div class="box-section">
          <div style="margin-bottom: 5px">
            <b-row class="box-section-line">
              <b-col style="text-align: left" cols="3">
                <b-input-group class="mt-3">
                  <b-form-input v-model="search.name" placeholder="공장 검색"></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary" size="sm" @click="searchDepartmentList">검색</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col style="text-align: right">
                <b-button variant="success" size="sm" @click="onClickAddNew">신규등록</b-button>
              </b-col>
            </b-row>
          </div>
          <div>
            <b-table
              head-variant="dark"
              bordered
              striped
              outlined
              table-variant="light"
              hover
              :items="departmentList"
              :fields="fields"
            >
              <template #cell(createdAt)="row">
                {{ row.item.createdAt.substring(0, 10) }}
              </template>
              <template #cell(updateBtn)="row">
                <a class="edit" @click="onClickEdit(row.item.id)"><i class="bx bxs-edit-alt bx-sm"></i></a>
              </template>
              <template #cell(deleteBtn)="row">
                <a class="delete" @click="onClickDelete(row.item.id)"><i class="bx bxs-trash bx-sm"></i></a>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </b-container>
    <!-- inform 영역 -->
    <inform />
  </div>
</template>

<script>
import inform from './inform.vue'

export default {
  components: {
    inform: inform
  },
  data() {
    return {
      fields: [
        // { key: 'id', label: 'id' },
        { key: 'name', label: '공장명' },
        { key: 'code', label: '공장코드' },
        { key: 'createdAt', label: '생성일' },
        { key: 'updateBtn', label: '수정' },
        { key: 'deleteBtn', label: '삭제' }
      ],
      search: {
        name: null
      }
    }
  },
  computed: {
    departmentList() {
      return this.$store.getters.DepartmentList
    },
    insertedResult() {
      return this.$store.getters.DepartmentInsertedResult
    },
    updatedResult() {
      return this.$store.getters.DepartmentUpdatedResult
    },
    deletedResult() {
      return this.$store.getters.DepartmentDeletedResult
    }
  },
  watch: {
    insertedResult(value) {
      // 등록 후 처리

      if (value !== null) {
        if (value > 0) {
          // 등록이 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('등록 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchDepartmentList()
        } else {
          // 등록이 실패한 경우
          this.$bvToast.toast('등록이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    updatedResult(value) {
      // 수정 후 처리

      if (value !== null) {
        if (value > 0) {
          // 수정이 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchDepartmentList()
        } else {
          // 수정이 실패한 경우
          this.$bvToast.toast('수정이 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    },
    deletedResult(value) {
      // 삭제 후 처리

      if (value !== null) {
        if (value > 0) {
          // 삭제가 성공한 경우

          // 1. 메시지 출력
          this.$bvToast.toast('삭제 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })

          // 2. 리스트 재검색
          this.searchDepartmentList()
        } else {
          // 삭제가 실패한 경우
          this.$bvToast.toast('삭제가 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    this.searchDepartmentList()
  },
  methods: {
    searchDepartmentList() {
      this.$store.dispatch('actDepartmentList', this.search)
    },
    onClickAddNew() {
      // 1. 입력모드 설정
      this.$store.dispatch('actDepartmentInputMode', 'insert')

      // 2. 상세정보 초기화
      this.$store.dispatch('actDepartmentInit')

      // 3. 모달 출력
      this.$bvModal.show('modal-department-inform')
    },
    onClickEdit(id) {
      // 1. 입력모드 설정
      this.$store.dispatch('actDepartmentInputMode', 'update')

      // 2. 상세정보 호출
      this.$store.dispatch('actDepartmentInfo', id)

      // 3. 모달 출력
      this.$bvModal.show('modal-department-inform')
    },
    onClickDelete(id) {
      // 삭제
      this.$bvModal.msgBoxConfirm('삭제 하시겠습니까?').then(value => {
        if (value) {
          this.$store.dispatch('actDepartmentDelete', id)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

* {
  font-family: 'Noto Sans KR', sans-serif;
}
.department a {
  color: black;
  padding-bottom: 0px;
  cursor: pointer;
}
.edit:hover {
  color: #0069d9;
}
.delete:hover {
  color: #c82333;
}
.box-section {
  flex: 2;
  // background-color: #181D31;
  border-radius: 32px;
  padding: 20px 32px 32px 32px;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  // color: #fff;
  text-align: center;

  &-line {
    display: flex;
    justify-content: space-between;
    align-items: self-end;
    padding-bottom: 10px;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    color: rgb(0, 0, 0);

    p {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      opacity: 0.9;
      margin: 0;
    }
  }
}

.title {
  padding-left: 24px;
  padding-top: 24px;
}
/deep/ .table .thead-dark th {
  text-transform: uppercase !important;
}
</style>

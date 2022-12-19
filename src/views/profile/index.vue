<template>
  <div>
    <b-container>
    <h1><i class='bx bxs-user bx-lg' style="padding-right: 10px"></i>내 프로필</h1>
    <div style="margin-bottom: 5px"></div>
    <b-card class="text-center">
      <div>
        <b-row>
          <b-col>
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <div class="avatar-upload">
                <div class="avatar-edit">
                  <form action="" method="post" id="form-image">
                    <input type="file" id="imageUpload" accept="image/*" @change="inputImg" />
                    <label for="imageUpload"></label>
                  </form>
                </div>
              </div>

              <b-avatar class="profile-user-img" size="150px">
                <img class="img-fluid" :src="getImgUrl" />
              </b-avatar>
            </div>

            <b-col>
              <div>
                <b-form-group label="이름" label-for="name" label-cols="3">
                  <b-input-group>
                    <b-form-input
                      v-if="this.inputMode === 'editName'"
                      id="name"
                      v-model="profileUser.name"
                    ></b-form-input>
                    <b-form-input v-else id="name" readonly v-model="profileUser.name"></b-form-input>
                    <b-input-group-append>
                      <b-button :pressed.sync="editBtn.name" title="수정" @click="editName">
                        <b-icon icon="pencil-fill"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-form-group label="공장" label-for="department" label-cols="3">
                  <b-form-input
                    v-if="getDepartmentName"
                    id="department"
                    readonly
                    v-model="profileUser.Department.name"
                  ></b-form-input>
                  <b-form-input v-else id="department" readonly></b-form-input>
                </b-form-group>

                <b-form-group label="권한" label-for="role" label-cols="3">
                  <b-form-input id="role" readonly v-model="profileUser.role"></b-form-input>
                </b-form-group>

                <b-form-group label="아이디" label-for="userid" label-cols="3">
                  <b-form-input
                    v-if="this.inputMode === 'update'"
                    id="userid"
                    v-model="profileUser.userid"
                  ></b-form-input>
                  <b-form-input v-else id="userid" readonly v-model="profileUser.userid"></b-form-input>
                </b-form-group>

                <b-form-group label="비밀번호" label-for="password" label-cols="3">
                  <b-input-group>
                    <b-form-input
                      v-if="this.inputMode === 'editPwd'"
                      id="password"
                      v-model="profileUser.password"
                      type="password"
                      >password</b-form-input
                    >
                    <b-form-input
                      v-else
                      id="password"
                      readonly
                      v-model="profileUser.password"
                      placeholder="●●●●●●●"
                      type="password"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button :pressed.sync="editBtn.password" title="수정" @click="editPwd">
                        <b-icon icon="pencil-fill"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-form-group label="이메일" label-for="email" label-cols="3">
                  <b-input-group>
                    <b-form-input
                      v-if="this.inputMode === 'editEmail'"
                      id="email"
                      v-model="profileUser.email"
                    ></b-form-input>
                    <b-form-input v-else id="email" readonly v-model="profileUser.email"></b-form-input>
                    <b-input-group-append>
                      <b-button :pressed.sync="editBtn.email" title="수정" @click="editEmail">
                        <b-icon icon="pencil-fill"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-form-group label="전화번호" label-for="phone" label-cols="3">
                  <b-input-group>
                    <b-form-input
                      v-if="this.inputMode === 'editPhone'"
                      id="phone"
                      v-model="profileUser.phone"
                    ></b-form-input>
                    <b-form-input v-else id="phone" readonly v-model="profileUser.phone"></b-form-input>
                    <b-input-group-append>
                      <b-button :pressed.sync="editBtn.phone" title="수정" @click="editPhone">
                        <b-icon icon="pencil-fill"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </div>
            </b-col>
          </b-col>
        </b-row>
      </div>
    </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editBtn: {
        name: false,
        password: false,
        email: false,
        phone: false
      },
      profileUser: {
        Department: {
          id: null,
          name: null
        },
        id: null,
        departmentId: null,
        name: null,
        userid: null,
        password: null,
        img: null,
        role: null,
        email: null,
        phone: null,
        updatedPwDate: null,
        createdAt: null
      }
    }
  },
  computed: {
    infoData() {
      return this.$store.getters.ProfileUser
    },
    inputMode() {
      return this.$store.getters.ProfileInputMode
    },
    updatedResult() {
      return this.$store.getters.ProfileUserUpdatedResult
    },
    tokenUserId() {
      return this.$store.getters.TokenUser.id
    },
    getImgUrl() {
      if (this.profileUser.img == null) {
        // 유저에 저장된 프로필사진이 없을 경우 (기본사진)
        return `${require('@/assets/user.png')}`
        // 유저에 저장된 프로필사진이 있을 경우
      } else if (this.profileUser.img !== null && typeof this.profileUser.img != 'object') {
        return `${process.env.VUE_APP_SERVER}/uploads/${this.profileUser.img}`
      }
    },
    getDepartmentName() {
      if (this.profileUser.Department !== null) {
        return this.profileUser.Department.name
      }
    }
  },
  watch: {
    // 페이지가 열린 이후에 감지됨
    infoData(value) {
      this.profileUser = { ...value }
    },

    // 수정 후 처리
    updatedResult(value) {
      if (value !== null) {
        setTimeout(() => {
          this.$store.dispatch('actProfileUserInfo', this.tokenUserId)
        }, 300)

        if (value > 0) {
          // 수정이 성공한 경우

          // 메세지 출력
          this.$bvToast.toast('수정 되었습니다.', {
            title: 'SUCCESS',
            variant: 'success',
            solid: true
          })
        } else if (value === -1) {
          // 수정이 실패한 경우

          this.$bvToast.toast('수정 실패하였습니다.', {
            title: 'ERROR',
            variant: 'danger',
            solid: true
          })
        }
      }
    }
  },
  created() {
    // 메이지가 최초 열릴 때 감지됨
    this.profileUser = { ...this.infoData }
    this.$store.dispatch('actProfileUserInfo', this.tokenUserId) // 토큰으로 유저 id 확인하여 정보 호출
  },
  methods: {
    editName() {
      console.log(this.editBtn.name)
      // 1. 수정 모드에서 수정버튼을 다시 클릭시
      if (this.inputMode === 'editName') {
        // 입력모드를 읽기 모드로 설정
        this.$store.dispatch('actProfileUserInputMode', 'show')

        // 입력된 값으로 수정
        this.$store.dispatch('actProfileUserUpdate', this.profileUser)

        // 2. 이름 수정 버튼 클릭시 수정 모드로 설정
      } else if (this.inputMode !== 'editName') {
        this.$store.dispatch('actProfileUserInputMode', 'editName')
      }
    },
    editPwd() {
      // 1. 수정 모드에서 수정버튼을 다시 클릭시
      if (this.inputMode === 'editPwd') {
        // 입력모드를 읽기 모드로 설정
        this.$store.dispatch('actProfileUserInputMode', 'show')

        // 입력된 값으로 수정
        this.$store.dispatch('actProfileUserUpdate', this.profileUser)

        // 2. 이름 수정 버튼 클릭시 수정 모드로 설정
      } else if (this.inputMode !== 'editPwd') {
        this.$store.dispatch('actProfileUserInputMode', 'editPwd')
      }
    },
    editEmail() {
      // console.log(this.editBtn[2].email)
      // 1. 수정 모드에서 수정버튼을 다시 클릭시
      if (this.inputMode === 'editEmail') {
        // 입력모드를 읽기 모드로 설정
        this.$store.dispatch('actProfileUserInputMode', 'show')

        // 입력된 값으로 수정
        this.$store.dispatch('actProfileUserUpdate', this.profileUser)

        // 2. 이름 수정 버튼 클릭시 수정 모드로 설정
      } else if (this.inputMode !== 'editEmail') {
        this.$store.dispatch('actProfileUserInputMode', 'editEmail')
      }
    },
    editPhone() {
      // console.log(this.editBtn[3].phone)
      // 1. 수정 모드에서 수정버튼을 다시 클릭시
      if (this.inputMode === 'editPhone') {
        // 입력모드를 읽기 모드로 설정
        this.$store.dispatch('actProfileUserInputMode', 'show')

        // 입력된 값으로 수정
        this.$store.dispatch('actProfileUserUpdate', this.profileUser)

        // 2. 이름 수정 버튼 클릭시 수정 모드로 설정
      } else if (this.inputMode !== 'editPhone') {
        this.$store.dispatch('actProfileUserInputMode', 'editPhone')
      }
    },
    inputImg(e) {
      let input = event.target
      // 이미지가 업로드 되었는지 확인
      if (input.files && input.files[0]) {
        this.profileUser.img = input.files[0]
        this.$store.dispatch('actProfileUserImgUpdate', this.profileUser)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: auto;
  margin-bottom: 20px;
}
.avatar-edit {
  position: absolute;
  left: 35px;
  z-index: 1;
  top: 130px;
  input {
    display: none;
    + label {
      display: inline-block;
      width: 38px;
      height: 38px;
      margin-bottom: 0;
      border-radius: 100%;
      background: #ffffff;
      border: 1px solid #d2d6de;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      font-weight: normal;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
      }
      &:after {
        content: '\f030';
        font-family: 'FontAwesome';
        color: #337ab7;
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        line-height: 34px;
        margin: auto;
      }
    }
  }
}

.btn.btn-secondary.active {
  background-color: #28a745;
  border-color: #28a745;
}

.form-control {
  width: 100%;
}

.form-row {
  width: 80%;
}

.img-fluid {
  max-height: 100%;
  max-width: inherit;
  height: auto;
}

.input-group {
  flex-wrap: inherit;
}
</style>

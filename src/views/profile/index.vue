<template>
    <div>
        <h1>프로필</h1>
        <div style="margin-bottom: 5px"></div>
            <b-card class="text-center">
                <div>
                    <b-row>
                        <b-col>
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <b-avatar size="150px">
                                    <img class="img-fluid"
                                        :src="getImgUrl"
                                        :alt="'https://placekitten.com/300/300'">
                                </b-avatar>
                                    <span class="font-weight-bold">{{ this.profileUser.name }}</span>
                            </div>

                            <b-col>
                                <div>
                                    <b-form-group label="이름" label-for="name" label-cols="3">
                                        <b-form-input v-if="this.inputMode === 'update'" id="name" v-model="profileUser.name"></b-form-input>
                                        <b-form-input v-else id="name" readonly v-model="profileUser.name"></b-form-input>
                                    </b-form-group>

                                    <b-form-group label="부서" label-for="department" label-cols="3">
                                        <b-form-input id="department" readonly v-model="profileUser.Department.name"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="권한" label-for="role" label-cols="3">
                                        <b-form-input id="role" readonly v-model="profileUser.role"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="아이디" label-for="userid" label-cols="3">
                                        <b-form-input v-if="this.inputMode === 'update'" id="userid"  v-model="profileUser.userid"></b-form-input>
                                        <b-form-input v-else id="userid" readonly v-model="profileUser.userid"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="비밀번호" label-for="password" label-cols="3">
                                        <b-button block variant="danger">비밀번호 변경</b-button>
                                    </b-form-group>
                                    <b-form-group label="이메일" label-for="email" label-cols="3">
                                        <b-form-input v-if="this.inputMode === 'update'" id="email" v-model="profileUser.email"></b-form-input>
                                        <b-form-input v-else id="email" readonly v-model="profileUser.email"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="전화번호" label-for="phone" label-cols="3">
                                        <b-form-input v-if="this.inputMode === 'update'" id="phone" v-model="profileUser.phone"></b-form-input>
                                        <b-form-input v-else id="phone" readonly v-model="profileUser.phone"></b-form-input>
                                    </b-form-group>
                                    <div class="mt-5 text-center">
                                        <b-button :pressed.sync="editToggle" variant="primary" @click="onClickEdit">정보 수정</b-button>
                                    </div>
                                </div>
                            </b-col>
                        </b-col>
                    </b-row>
                </div>
            </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editToggle: false,
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
            },
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
            if (this.profileUser.img !== null) {
                return `${process.env.VUE_APP_SERVER}/uploads/${this.profileUser.img}`
            }  
        },
    },
    watch: {
        // 페이지가 열린 이후에 감지됨
        infoData(value) {
            this.profileUser = { ...value }
        },
    
        // 수정 후 처리
        updatedResult(value) {
            if (value !== null) {
                if (value > 0) {
                    // 수정이 성공한 경우

                    // 메세지 출력
                    this.$bvToast.toast('수정 되었습니다.', {
                        title: 'SUCCESS',
                        variant: 'success',
                        solid: true
                    })
                } else {
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
        // 정보 수정
        onClickEdit() {
            console.log(this.editToggle)
            console.log(this.profileUser)

            // 수정 활성화
            if (this.editToggle === true) {
                console.log('update active')
                this.$store.dispatch('actProfileUserInputMode', 'update')

            // 수정 비활성화
            } else {
                if (this.inputMode === 'update') {
                    this.$store.dispatch('actProfileUserUpdate', this.profileUser) // 수정 실행
                }
                this.$store.dispatch('actProfileUserInputMode', 'show')
            }            
        },
    }  
}
</script>

<style lang="scss" scoped>
.form-control {
    width: 100%
}

.form-row {
    width: 80%
}

.img-fluid {
    max-height: 100%;
    max-width: inherit;
    height: auto;
}
</style>

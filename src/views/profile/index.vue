<template>
    <div>
        <h1>프로필</h1>
        <div style="margin-bottom: 5px"></div>
            <b-card class="text-center">
                <div>
                    <b-row>
                        <b-col>
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <b-avatar variant="light" size="100px"></b-avatar>
                                    <span class="font-weight-bold">뽀로로</span>
                                    <span class="text-black-50">test@test.com</span>
                            </div>

                            <b-col>
                                <div class="p-3">
                                    <b-form-group label="이름" label-for="name" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="부서" label-for="department" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="권한" label-for="role" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="아이디" label-for="userid" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="비밀번호" label-for="password" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="이메일" label-for="email" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <b-form-group label="전화번호" label-for="phone" label-cols="3">
                                        <b-form-input readonly></b-form-input>
                                    </b-form-group>
                                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">수정</button>
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
    
}
</script>

<style lang="scss" scoped>
.form-control {
    width: 70%
}
</style>
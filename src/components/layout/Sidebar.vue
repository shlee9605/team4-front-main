<template>
<div>
  <div class="sidebar" v-bind:class="{open: isActive}">
    <div class="logo-details">
      <i class="bx bxs-bolt-circle icon bx-sm"></i>
      <div class="logo_name" @click="onClick('/')">Smart Factory</div>
      <i v-bind:class="{ 'bx bx-menu-alt-right bx-sm': isActive, 'bx bx-menu bx-sm': !isActive }" id="btn" @click="handleMenu"></i>
    </div>

    <ul class="nav_list">
      <li>
        <a href="#" @click="onClick('/home')">
          <i class='bx bxs-home-alt-2 bx-sm' ></i>
          <span class="links_name">홈</span>
        </a>
        <span class="tooltip">홈</span>
      </li>

      <li>
        <a href="#" @click="onClick('/dashboard')">
          <i class='bx bxs-dashboard bx-sm'></i>
          <span class="links_name">대시보드</span>
        </a>
        <span class="tooltip">대시보드</span>
      </li>

      <li v-if="tokenUserRole !== '팀원'">
        <a href="#" @click="onClick('/department')">
          <i class='bx bxs-factory bx-sm'></i>
          <span class="links_name">공장 관리</span>
        </a>
        <span class="tooltip">공장 관리</span>
      </li>

      <li v-if="tokenUserRole !== '팀원'">
        <a href="#" @click="onClick('/user')">
          <i class='bx bxs-user-account bx-sm' ></i>
          <span class="links_name">사용자 관리</span>
        </a>
        <span class="tooltip">사용자 관리</span>
      </li>

      <li>
        <a href="#" @click="onClick('/profile')">
          <i class='bx bxs-user bx-sm'></i>
          <span class="links_name">내 프로필</span>
        </a>
        <span class="tooltip">내 프로필</span>
      </li>

      <li class="profile">
        <div class="profile-details">
          <img src="@/assets/user.png" alt="profileImg">
          <div class="name_job">
            <div class="name">Annie</div>
            <div class="job">Web Designer</div>
          </div>
        </div>
        <a @click="onClick('/auth/logout')">
          <i class='bx bx-log-out bx-sm' id="log_out"></i>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    tokenUserRole() {
      return this.$store.getters.TokenUser.role
    }
  },
  methods: {
    handleMenu() {
      this.isActive = !this.isActive
    },
    onClick(path) {
      this.$router.push(path).catch(() => {
        console.log('#')
      })
    }
  }
}
</script>

<style lang="scss">
/* Google Font Link */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
}
.sidebar{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 78px;
  background: #11101D;
  padding: 6px 14px;
  z-index: 99;
  transition: all 0.5s ease;
}
.sidebar.open{
  width: 250px;
  .flex {
    flex: 1, 1, 0;
  }
}
.sidebar .logo-details{
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon{
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name{
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
  cursor: pointer;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name{
  opacity: 1;
}
.sidebar .logo-details #btn{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn{
  text-align: right;
}
.sidebar i{
  color: #fff;
  height: 60px;
  min-width: 50px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
}
.sidebar .nav-list{
  margin-top: 20px;
  height: 100%;
}
.sidebar li{
  position: relative;
  margin: 8px 0;
  list-style: none;
}
.sidebar li .tooltip{
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 3;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip{
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip{
  display: none;
}
.sidebar input{
  font-size: 15px;
  color: #FFF;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #1d1b31;
}
.sidebar.open input{
  padding: 0 20px 0 50px;
  width: 100%;
}
.sidebar .bx-search{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 22px;
  background: #1d1b31;
  color: #FFF;
}
.sidebar.open .bx-search:hover{
  background: #1d1b31;
  color: #FFF;
}
.sidebar .bx-search:hover{
  background: #FFF;
  color: #11101d;
}
.sidebar li a{
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101D;
}
.sidebar li a:hover{
  background: #FFF;
}
.sidebar li a .links_name{
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name{
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i{
  transition: all 0.5s ease;
  color: #11101D;
}
.sidebar li i{
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
}
.sidebar li.profile{
  position: fixed;
  height: 60px;
  width: 78px;
  left: 0;
  bottom: -8px;
  padding: 10px 14px;
  background: #1d1b31;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar.open li.profile{
  width: 250px;
}
.sidebar li .profile-details{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img{
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name,
.sidebar li.profile .job{
  font-size: 15px;
  font-weight: 400;
  color: #fff;
  white-space: nowrap;
}
.sidebar li.profile .job{
  font-size: 12px;
}
.sidebar .profile #log_out{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #1d1b31;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px;
  transition: all 0.5s ease;
  cursor: pointer;
  color: #fff;
}
.sidebar.open .profile #log_out{
  width: 50px;
  background: none;
  cursor: pointer;
  color: #fff;
}
// .home-section{
//   position: relative;
//   background: #E4E9F7;
//   min-height: 100vh;
//   top: 0;
//   left: 78px;
//   width: calc(100% - 78px);
//   transition: all 0.5s ease;
//   z-index: 2;
// }
.sidebar.open ~ .content-body{
  left: 250px;
  width: calc(100% - 250px);
}

.sidebar.open ~ .header{
  left: 250px;
  width: calc(100% - 250px);
}
// .home-section .text{
//   display: inline-block;
//   color: #11101d;
//   font-size: 25px;
//   font-weight: 500;
//   margin: 18px
// }
@media (max-width: 420px) {
  .sidebar li .tooltip{
    display: none;
  }
}


</style>